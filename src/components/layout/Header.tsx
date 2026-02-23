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
    <header className="relative overflow-hidden no-print">
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
      `}</style>

      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(-45deg, #059669, #0d9488, #0891b2, #0d9488, #059669)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 60% 80%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated glow orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -translate-y-1/2 translate-x-1/4"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full translate-y-1/3 -translate-x-1/4"
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)',
          animation: 'pulseGlow 5s ease-in-out infinite 1s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          animation: 'pulseGlow 6s ease-in-out infinite 2s',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
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
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20" />

      <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1 w-full flex items-start gap-4">
              {/* Mobile Hamburger */}
              <button
                onClick={onSidebarToggle}
                className="lg:hidden p-2 -ml-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-5">
                  {/* Animated glowing icon container */}
                  <div
                    className="relative p-4 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                        animation: 'shimmer 3s linear infinite',
                        backgroundSize: '200% 100%',
                      }}
                    />
                    <Wheat
                      className="w-10 h-10 text-white relative z-10"
                      aria-hidden="true"
                      style={{ animation: 'iconPulse 3s ease-in-out infinite' }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-white"
                        style={{
                          textShadow: '0 2px 20px rgba(0,0,0,0.2), 0 0 40px rgba(255,255,255,0.1)',
                        }}
                      >
                        GrainTech
                      </h1>
                      <Sparkles className="w-7 h-7 text-amber-400 animate-pulse hidden sm:block" />
                    </div>
                    <p className="text-amber-400/90 text-sm font-semibold tracking-widest uppercase mt-1">
                      Intelligence Platform
                    </p>
                  </div>
                </div>

                <p
                  className="text-white/90 text-base sm:text-lg max-w-xl font-medium leading-relaxed"
                  style={{ textShadow: '0 1px 10px rgba(0,0,0,0.1)' }}
                >
                  Exploring how grain quality checks are going digital with cutting-edge AI & automation
                </p>

                {/* Enhanced stat badges */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <div
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-xl font-bold text-white">{animatedSolutions}</span>
                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Solutions</span>
                  </div>
                  <div
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="text-xl font-bold text-white">{animatedDatasets}</span>
                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Datasets</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.05) 100%)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                      border: '1px solid rgba(251,191,36,0.2)',
                    }}
                  >
                    <span className="text-lg">🌍</span>
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">Global Coverage</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch lg:items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                {/* Share Button */}
                <ShareButton url={getShareableUrl({})} title="GrainTech Intelligence Dashboard" />

                {/* Print Button */}
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 p-3 sm:px-4 sm:py-3 text-sm font-medium rounded-xl text-white hover:scale-105 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                  title="Print"
                >
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="p-3 rounded-xl text-white hover:scale-105 transition-all duration-300 focus:outline-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Print-only header */}
      <div className="print-header print-only">
        <h1>GrainTech Intelligence Dashboard</h1>
        <p>Generated on {new Date().toLocaleDateString()}</p>
      </div>
    </header>
  );
}
