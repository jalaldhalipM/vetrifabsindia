'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { isAdminLoggedIn, adminLogout } from '@/lib/adminStore';

const NAV = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Don't run auth check on the login page itself
    if (pathname === '/admin/login') {
      setChecking(false);
      return;
    }
    if (!isAdminLoggedIn()) {
      router.replace('/admin/login');
    } else {
      setChecking(false);
    }
  }, [router, pathname]);

  const logout = useCallback(() => {
    adminLogout();
    router.push('/admin/login');
  }, [router]);

  // Render login page without sidebar/layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050d08' }}>
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
    );
  }


  return (
    <div className="flex min-h-screen" style={{ background: 'linear-gradient(135deg, #0a1f10 0%, #050d08 100%)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
        style={{
          width: 260,
          background: 'linear-gradient(180deg, rgba(22,128,60,0.12) 0%, rgba(5,13,8,0.98) 100%)',
          borderRight: '1px solid rgba(22,128,60,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(22,128,60,0.2)' }}>
          <Link href="/" className="flex items-center gap-2.5" target="_blank">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-lg text-white" style={{ background: 'linear-gradient(135deg, #16803C, #0B3D24)' }}>
              VF
            </div>
            <div>
              <p className="text-sm font-extrabold text-white leading-none">Vetri Fabs</p>
              <p className="text-[10px] font-medium" style={{ color: '#4ade80' }}>Admin Panel</p>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group"
                style={{
                  background: active ? 'rgba(22,128,60,0.25)' : 'transparent',
                  color: active ? '#4ade80' : 'rgba(255,255,255,0.65)',
                  border: active ? '1px solid rgba(22,128,60,0.4)' : '1px solid transparent',
                  boxShadow: active ? '0 0 20px rgba(22,128,60,0.15)' : 'none',
                }}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" style={{ color: active ? '#4ade80' : 'rgba(255,255,255,0.4)' }} />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" style={{ color: '#4ade80' }} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: View Site + Logout */}
        <div className="px-4 py-5 space-y-2 border-t" style={{ borderColor: 'rgba(22,128,60,0.15)' }}>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all w-full"
            style={{ color: 'rgba(167,243,208,0.7)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Website
          </Link>
          <button
            onClick={logout}
            id="admin-logout-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all w-full"
            style={{ color: '#fca5a5', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4"
          style={{
            background: 'rgba(5,13,8,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(22,128,60,0.15)',
          }}
        >
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: 'rgba(22,128,60,0.15)', color: '#4ade80', border: '1px solid rgba(22,128,60,0.3)' }}
          >
            <Menu className="w-4.5 h-4.5" />
          </button>

          <div>
            <h2 className="text-sm font-bold text-white leading-none">
              {NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))?.label ?? 'Admin'}
            </h2>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(167,243,208,0.5)' }}>
              Vetri Fabs India — Content Management System
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
