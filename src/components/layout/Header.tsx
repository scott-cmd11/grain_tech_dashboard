import { Sun, Moon, Printer, Menu, Wheat, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUrlState } from '../../hooks/useUrlState';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { ShareButton } from '../ShareButton';
import { getDenormalizedSolutions } from '../../utils/dataNormalization';
import { datasetsData } from '../../data';
import { useMemo } from 'react';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

// Floating particle component
function FloatingParticle({ delay, size, x, duration }: { delay: number; size: number; x: number; duration: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        bottom: '-20px',
        animation: `floatUp ${duration}s ease-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <Wheat
        className="text-white/20"
        style={{
          width: size,
          height: size,
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const { toggleTheme, isDark } = useTheme();
  const { getShareableUrl } = useUrlState();
  const solutionsCount = getDenormalizedSolutions().length;
  const animatedSolutions = useAnimatedCounter(solutionsCount);
  const animatedDatasets = useAnimatedCounter(datasetsData.length);

  // Generate stable particles
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 0.8,
      size: 16 + (i % 3) * 8,
      x: 5 + (i * 8),
      duration: 8 + (i % 4) * 2,
    })), []
  );

  return (
    <header className="relative overflow-hidden no-print bg-emerald-600 dark:bg-transparent transition-colors duration-300">
      {/* Keyframe animations */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-400px) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 16px rgba(255,255,255,0.5));
          }
        }
        
        /* Premium light mode styles for Header */
        .header-premium-light {
          background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1);
        }
        
        /* Premium dark mode styles for Header (similar to original) */
        .header-premium-dark {
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.7) 0%, rgba(9, 9, 11, 0.8) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        /* Base button/badge styles */
        .glass-element {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        /* Light mode elements */
        .glass-element-light {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06), inset 0 1px 0 white;
          color: #334155;
        }
        .glass-element-light:hover {
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
          background: rgba(255, 255, 255, 1);
        }
        
        /* Dark mode elements */
        .glass-element-dark {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          color: white;
        }
        .glass-element-dark:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%);
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        /* Gold accent elements */
        .glass-gold-light {
          background: rgba(254, 252, 232, 0.9);
          border: 1px solid rgba(254, 240, 138, 0.8);
          box-shadow: 0 2px 8px rgba(202, 138, 4, 0.15), inset 0 1px 0 white;
          color: #854d0e;
        }
        .glass-gold-dark {
          background: linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 100%);
          border: 1px solid rgba(251,191,36,0.2);
          box-shadow: 0 4px 15px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1);
          color: white;
        }
      `}</style>

      {/* Animated gradient background (Dark mode only) */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'linear-gradient(-45deg, #059669, #0d9488, #0891b2, #0d9488, #059669)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Light mode background */}
      <div className="absolute inset-0 block dark:hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />

      {/* Mesh gradient overlay (Dark mode only) */}
      <div
        className="absolute inset-0 opacity-50 hidden dark:block"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 60% 80%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated glow orbs (Adjusted for light/dark) */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -translate-y-1/2 translate-x-1/4 dark:opacity-100 opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full translate-y-1/3 -translate-x-1/4 dark:opacity-100 opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
          animation: 'pulseGlow 5s ease-in-out infinite 1s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2 dark:opacity-100 opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          animation: 'pulseGlow 6s ease-in-out infinite 2s',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 opacity-[0.03] dark:opacity-[0.05] ${isDark ? 'text-white' : 'text-slate-900'}`}
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating grain particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <FloatingParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Glass overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-slate-900/5 dark:to-black/20" />

      <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1 w-full flex items-start gap-4">
              {/* Mobile Hamburger */}
              <button
                onClick={onSidebarToggle}
                className="lg:hidden p-2 -ml-2 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-xl transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  {/* Animated glowing icon container */}
                  <div
                    className={`relative p-4 rounded-2xl ${isDark ? 'header-premium-dark' : 'header-premium-light'}`}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl opacity-50 dark:opacity-100"
                      style={{
                        background: isDark ? 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)',
                        animation: 'shimmer 3s linear infinite',
                        backgroundSize: '200% 100%',
                      }}
                    />
                    <Wheat
                      className="w-10 h-10 text-emerald-600 dark:text-white relative z-10"
                      aria-hidden="true"
                      style={{ animation: 'iconPulse 3s ease-in-out infinite' }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-800 dark:text-white"
                        style={{
                          textShadow: isDark ? '0 2px 20px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,255,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
                        }}
                      >
                        GrainTech
                      </h1>
                      <Sparkles className="w-7 h-7 text-amber-500 dark:text-amber-400 animate-pulse hidden sm:block" />
                    </div>
                    <p className="text-emerald-700 dark:text-amber-400/90 text-sm font-semibold tracking-widest uppercase mt-1">
                      Intelligence Platform
                    </p>
                  </div>
                </div>

                <p
                  className="text-slate-600 dark:text-white/90 text-base sm:text-lg max-w-xl font-medium leading-relaxed"
                  style={{ textShadow: isDark ? '0 1px 10px rgba(0,0,0,0.1)' : 'none' }}
                >
                  Exploring how grain quality checks are going digital with cutting-edge AI & automation
                </p>

                {/* Enhanced stat badges */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <div
                    className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full cursor-default glass-element hover:scale-105 ${isDark ? 'glass-element-dark' : 'glass-element-light'
                      }`}
                  >
                    <span className="text-xl font-bold">{animatedSolutions}</span>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-70">Solutions</span>
                  </div>
                  <div
                    className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full cursor-default glass-element hover:scale-105 ${isDark ? 'glass-element-dark' : 'glass-element-light'
                      }`}
                  >
                    <span className="text-xl font-bold">{animatedDatasets}</span>
                    <span className="text-xs font-medium uppercase tracking-wider opacity-70">Datasets</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-default glass-element hover:scale-105 ${isDark ? 'glass-gold-dark' : 'glass-gold-light'
                      }`}
                  >
                    <span className="text-lg">🌍</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">Global Coverage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch lg:items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                {/* Share Button */}
                <ShareButton url={getShareableUrl({})} title="GrainTech Intelligence Dashboard" isDark={isDark} />

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className={`flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-3 text-sm font-medium rounded-xl hover:scale-105 glass-element ${isDark ? 'glass-element-dark' : 'glass-element-light'
                    }`}
                  title="Print"
                >
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className={`p-3 rounded-xl hover:scale-105 focus:outline-none glass-element ${isDark ? 'glass-element-dark' : 'glass-element-light'
                    }`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-700 hover:text-gray-900" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/20 to-transparent" />

      {/* Print-only header */}
      <div className="print-header print-only">
        <h1>GrainTech Intelligence Dashboard</h1>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </header>
  );
}
