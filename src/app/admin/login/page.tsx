'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { adminLogin, isAdminLoggedIn } from '@/lib/adminStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
    if (isAdminLoggedIn()) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  // 3D particle / grid canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    interface Particle { x: number; y: number; z: number; vx: number; vy: number; vz: number; }
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: -0.8 - Math.random() * 0.6,
    }));

    const fov = 500;
    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // Background gradient
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.85);
      bg.addColorStop(0, '#0d2b18');
      bg.addColorStop(0.5, '#091a0f');
      bg.addColorStop(1, '#050d08');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Grid lines perspective
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#16803C';
      ctx.lineWidth = 0.8;
      const gridSize = 80;
      const offset = (t * 30) % gridSize;
      for (let gx = -w; gx < w * 2; gx += gridSize) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx + w * 0.3, h);
        ctx.stroke();
      }
      for (let gy = -offset; gy < h + gridSize; gy += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.restore();

      // 3D particles
      particles.forEach((p) => {
        p.z += p.vz;
        p.x += p.vx;
        p.y += p.vy;

        if (p.z < 1) { p.z = 1200; p.x = (Math.random() - 0.5) * 2000; p.y = (Math.random() - 0.5) * 2000; }

        const scale = fov / (fov + p.z);
        const px2d = p.x * scale + w / 2;
        const py2d = p.y * scale + h / 2;

        if (px2d < 0 || px2d > w || py2d < 0 || py2d > h) return;

        const size = Math.max(0.5, 2.5 * scale);
        const alpha = Math.min(1, scale * 1.2);

        ctx.beginPath();
        ctx.arc(px2d, py2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${22 + Math.round(scale * 80)}, ${128 + Math.round(scale * 40)}, 60, ${alpha})`;
        ctx.fill();
      });

      // Glowing rings
      [0, 1].forEach((i) => {
        const phase = t * 0.5 + i * Math.PI;
        const rx = w / 2 + Math.cos(phase) * 80;
        const ry = h / 2 + Math.sin(phase * 0.7) * 50;
        const ring = ctx.createRadialGradient(rx, ry, 10, rx, ry, 200 + i * 60);
        ring.addColorStop(0, 'rgba(22,128,60,0.12)');
        ring.addColorStop(0.5, 'rgba(22,128,60,0.04)');
        ring.addColorStop(1, 'transparent');
        ctx.fillStyle = ring;
        ctx.fillRect(0, 0, w, h);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const ok = adminLogin(username, password);
    if (ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Animated Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Glassmorphism Login Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4"
        style={{
          transform: 'perspective(1000px) rotateX(0deg)',
          animation: 'cardFloat 6s ease-in-out infinite',
        }}
      >
        <style>{`
          @keyframes cardFloat {
            0%, 100% { transform: perspective(1000px) translateY(0px) rotateX(1deg); }
            50% { transform: perspective(1000px) translateY(-8px) rotateX(-1deg); }
          }
          @keyframes lockPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(22,128,60,0.4); }
            50% { box-shadow: 0 0 0 16px rgba(22,128,60,0); }
          }
          @keyframes borderGlow {
            0%, 100% { border-color: rgba(22,128,60,0.3); box-shadow: 0 0 20px rgba(22,128,60,0.1); }
            50% { border-color: rgba(22,128,60,0.7); box-shadow: 0 0 40px rgba(22,128,60,0.25), inset 0 0 40px rgba(22,128,60,0.05); }
          }
        `}</style>

        <div
          className="rounded-3xl border p-8 sm:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'borderGlow 3s ease-in-out infinite',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Logo / Lock Icon */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 cursor-default"
              style={{
                background: 'linear-gradient(135deg, #16803C, #0B3D24)',
                boxShadow: '0 8px 32px rgba(22,128,60,0.4), 0 2px 8px rgba(0,0,0,0.3)',
                animation: 'lockPulse 2.5s ease-in-out infinite',
              }}
            >
              <Lock className="w-9 h-9 text-white" strokeWidth={2} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                VETRI FABS <span style={{ color: '#4ade80' }}>INDIA</span>
              </h1>
              <p className="text-sm font-medium mt-1" style={{ color: 'rgba(167,243,208,0.7)' }}>
                Admin Control Panel
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(167,243,208,0.8)' }}>
                Username
              </label>
              <input
                type="text"
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter your username"
                className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/30 text-sm font-medium outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(22,128,60,0.3)',
                  backdropFilter: 'blur(8px)',
                }}
                onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.8)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(22,128,60,0.2)'; }}
                onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.3)'; e.currentTarget.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'rgba(167,243,208,0.8)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3.5 pr-12 rounded-xl text-white placeholder-white/30 text-sm font-medium outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(22,128,60,0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.8)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(22,128,60,0.2)'; }}
                  onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(22,128,60,0.3)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
                  style={{ color: 'rgba(167,243,208,0.6)' }}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="admin-login-btn"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 mt-2"
              style={{
                background: loading
                  ? 'rgba(22,128,60,0.5)'
                  : 'linear-gradient(135deg, #16803C, #0f5c2b)',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(22,128,60,0.4)',
                transform: loading ? 'none' : undefined,
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(22,128,60,0.5)'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(22,128,60,0.4)'; }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
              ) : (
                <><Lock className="w-4 h-4" /> Access Dashboard</>
              )}
            </button>
          </form>

          {/* Hint */}
          <p className="text-center text-xs mt-6" style={{ color: 'rgba(167,243,208,0.4)' }}>
            Authorized personnel only · Vetri Fabs India CMS
          </p>
        </div>
      </div>
    </div>
  );
}
