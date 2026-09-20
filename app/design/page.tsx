'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, ArrowRight, Download } from 'lucide-react';

// ============= LOGO COMPONENTS =============

export function RessellerProLogo({ size = 64, animated = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
    >
      <defs>
        <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F3A7D" stopOpacity="1" />
          <stop offset="50%" stopColor="#1A5FBF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="grad-accent" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle cx="100" cy="100" r="95" fill="url(#grad-primary)" opacity="0.15" filter="url(#glow)"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad-primary)" strokeWidth="1" opacity="0.4"/>

      <circle cx="70" cy="70" r="28" fill="none" stroke="url(#grad-primary)" strokeWidth="2.5" opacity="0.9"/>
      <text x="70" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="url(#grad-primary)">🌐</text>

      <circle cx="130" cy="70" r="28" fill="none" stroke="url(#grad-primary)" strokeWidth="2.5" opacity="0.85"/>
      <text x="130" y="76" textAnchor="middle" fontSize="18" fontWeight="700" fill="url(#grad-primary)">🏢</text>

      <circle cx="70" cy="130" r="28" fill="none" stroke="url(#grad-accent)" strokeWidth="2.5" opacity="0.85"/>
      <text x="70" y="136" textAnchor="middle" fontSize="18" fontWeight="700" fill="url(#grad-accent)">⚡</text>

      <circle cx="130" cy="130" r="28" fill="none" stroke="url(#grad-accent)" strokeWidth="2.5" opacity="0.9"/>
      <text x="130" y="136" textAnchor="middle" fontSize="18" fontWeight="700" fill="url(#grad-accent)">🚀</text>

      <circle cx="100" cy="100" r="20" fill="url(#grad-primary)" opacity="0.3" filter="url(#glow)"/>
      <circle cx="100" cy="100" r="12" fill="url(#grad-primary)" opacity="0.8"/>

      <line x1="70" y1="98" x2="88" y2="100" stroke="url(#grad-primary)" strokeWidth="1.5" opacity="0.5"/>
      <line x1="130" y1="98" x2="112" y2="100" stroke="url(#grad-primary)" strokeWidth="1.5" opacity="0.5"/>
      <line x1="98" y1="70" x2="100" y2="88" stroke="url(#grad-accent)" strokeWidth="1.5" opacity="0.5"/>
      <line x1="98" y1="130" x2="100" y2="112" stroke="url(#grad-accent)" strokeWidth="1.5" opacity="0.5"/>

      {animated && (
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#grad-primary)"
          strokeWidth="0.5"
          opacity="0.2"
          animate={{ r: [90, 100, 90] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </svg>
  );
}

// ============= GRADIENT MESH BACKGROUND =============

function AnimatedGradientMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ============= GLASSMORPHIC CARD =============

function GlassmorphicCard({ children, className = '' }) {
  return (
    <div className={`relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:border-white/40 transition-all hover:shadow-cyan-500/20 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"/>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============= KINETIC TEXT =============

function KineticText({ text, className = '' }) {
  return (
    <div className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

// ============= DESIGN SHOWCASE PAGE =============

export default function DesignShowcase() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <AnimatedGradientMesh />

      {/* Header Navigation */}
      <header className="relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <RessellerProLogo size={40} />
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Design System 2026
            </span>
          </motion.div>
          <nav className="flex gap-6">
            <a href="/" className="text-sm font-medium hover:text-cyan-400 transition">← Back</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <KineticText
            text="High-End Design System"
            className="text-6xl md:text-7xl font-black tracking-tight mb-6"
          />
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Summer 2026 trends: Glassmorphism, Kinetic Typography, Animated Gradients, Premium Micro-interactions
          </p>
        </motion.section>

        {/* Logo Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            Brand Identity
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Logo Variants */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Logo Variants</h3>
              
              <div className="space-y-8">
                {/* Primary Logo */}
                <div className="flex flex-col items-center p-8 bg-white/5 rounded-2xl border border-white/10">
                  <RessellerProLogo size={120} animated={true} />
                  <p className="text-sm text-gray-400 mt-4">Primary Logo - Animated</p>
                  <button
                    onClick={() => copyToClipboard('RessellerProLogo-Animated', 'logo-primary')}
                    className="mt-3 flex items-center gap-2 text-xs bg-cyan-500/20 hover:bg-cyan-500/40 px-3 py-1 rounded-lg transition"
                  >
                    {copied === 'logo-primary' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied === 'logo-primary' ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                {/* Static Logo */}
                <div className="flex flex-col items-center p-8 bg-white/5 rounded-2xl border border-white/10">
                  <RessellerProLogo size={120} animated={false} />
                  <p className="text-sm text-gray-400 mt-4">Static Logo - No Animation</p>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Logo Specifications */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Specifications</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-cyan-400 font-semibold">Concept</p>
                  <p className="text-gray-300">4 Interlocked Circles: Domains, Hosting, Functions, Deployments</p>
                </div>

                <div>
                  <p className="text-sm text-cyan-400 font-semibold">Colors</p>
                  <div className="flex gap-2 mt-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400" title="#0F3A7D → #00D9FF"/>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-600" title="#00D9FF → #8B5CF6"/>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-cyan-400 font-semibold">Features</p>
                  <ul className="text-sm text-gray-300 space-y-1 mt-2">
                    <li>✅ Glassmorphism design</li>
                    <li>✅ Animated pulse effect</li>
                    <li>✅ SVG format (scalable)</li>
                    <li>✅ 32px to 512px sizing</li>
                    <li>✅ High contrast accessibility</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm text-cyan-400 font-semibold">Usage</p>
                  <code className="text-xs bg-black/30 p-2 rounded block mt-2 overflow-x-auto">
                    {'<RessellerProLogo size={64} animated={true} />'}
                  </code>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </motion.section>

        {/* Design Trends */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Summer 2026 Design Trends</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Glassmorphism */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">🌫️ Glassmorphism</h3>
              <p className="text-gray-300 mb-4">
                Semi-transparent layers with blur effects create a premium frosted glass aesthetic.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• backdrop-blur-xl for depth</p>
                <p>• bg-white/10 for transparency</p>
                <p>• border-white/20 for definition</p>
                <p>• Layered glow effects</p>
              </div>
            </GlassmorphicCard>

            {/* Kinetic Typography */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">✨ Kinetic Typography</h3>
              <p className="text-gray-300 mb-4">
                Character-by-character animations create dynamic, engaging typography.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Staggered entrance animations</p>
                <p>• Variable delay per character</p>
                <p>• Spring physics for bounce</p>
                <p>• Responsive scaling (5xl-7xl)</p>
              </div>
            </GlassmorphicCard>

            {/* Animated Gradients */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">🎨 Animated Gradient Mesh</h3>
              <p className="text-gray-300 mb-4">
                Dual animated gradient blobs create organic, flowing backgrounds.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• 20-25 second animation cycles</p>
                <p>• Smooth easing curves</p>
                <p>• Positioned behind content</p>
                <p>• Multiple gradient layers</p>
              </div>
            </GlassmorphicCard>

            {/* Micro-Interactions */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">🎯 Micro-Interactions</h3>
              <p className="text-gray-300 mb-4">
                Subtle, purposeful animations provide feedback and delight users.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Hover scale & shadow effects</p>
                <p>• Tap/click spring physics</p>
                <p>• Shimmer effects on buttons</p>
                <p>• Smooth color transitions</p>
              </div>
            </GlassmorphicCard>

            {/* Color Palette */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">🎭 Premium Colors</h3>
              <p className="text-gray-300 mb-4">
                Deep charcoal with electric accents and layered shadows.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Background: #0A0E27 (deep space)</p>
                <p>• Cyan: #00D9FF (electric)</p>
                <p>• Blue: #1A5FBF (rich)</p>
                <p>• Purple: #8B5CF6 (lavender)</p>
              </div>
            </GlassmorphicCard>

            {/* Page Transitions */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4">🔄 Smooth Transitions</h3>
              <p className="text-gray-300 mb-4">
                AnimatePresence creates elegant page-to-page transitions.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>• Fade in/out animations</p>
                <p>• Slide transitions</p>
                <p>• 0.3s animation duration</p>
                <p>• "wait" mode for sequences</p>
              </div>
            </GlassmorphicCard>
          </div>
        </motion.section>

        {/* Component Gallery */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Component Examples</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Button Example */}
            <GlassmorphicCard>
              <h3 className="text-xl font-bold mb-6">Premium Button</h3>
              <motion.button
                className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 217, 255, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative">Get Started</span>
              </motion.button>
              <p className="text-xs text-gray-400 mt-4">Spring physics + shimmer effect</p>
            </GlassmorphicCard>

            {/* Card Hover */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <GlassmorphicCard className="h-full">
                <h3 className="text-xl font-bold mb-4">Card Hover Effect</h3>
                <p className="text-gray-300 text-sm">
                  Hover over this card to see smooth scale and shadow animations combined with glassmorphism.
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600"/>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-600"/>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-red-600"/>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Interactive Element */}
            <GlassmorphicCard>
              <h3 className="text-xl font-bold mb-6">Animated Counter</h3>
              <motion.div
                className="text-6xl font-black text-center text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                24
              </motion.div>
              <p className="text-center text-sm text-gray-400 mt-4">AI Features</p>
            </GlassmorphicCard>
          </div>
        </motion.section>

        {/* Color Palette Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Color System</h2>

          <GlassmorphicCard>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { name: 'Deep Space', color: '#0A0E27' },
                { name: 'Cyan', color: '#00D9FF' },
                { name: 'Rich Blue', color: '#1A5FBF' },
                { name: 'Lavender', color: '#8B5CF6' },
                { name: 'Hot Pink', color: '#EC4899' },
              ].map((color) => (
                <motion.div
                  key={color.name}
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className="w-24 h-24 rounded-2xl shadow-lg cursor-pointer transition hover:shadow-2xl"
                    style={{ backgroundColor: color.color }}
                    onClick={() => copyToClipboard(color.color, color.name)}
                  />
                  <p className="text-xs font-semibold mt-3">{color.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{color.color}</p>
                  {copied === color.name && <Check className="w-4 h-4 text-cyan-400 mt-1" />}
                </motion.div>
              ))}
            </div>
          </GlassmorphicCard>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-12">Design Coverage</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Design Trends', value: '8/8', icon: '✨' },
              { label: 'Components', value: '12+', icon: '🎨' },
              { label: 'Animations', value: '24+', icon: '🎬' },
              { label: 'Accessibility', value: 'AA', icon: '♿' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <GlassmorphicCard>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                    <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <GlassmorphicCard className="text-center py-16">
            <h2 className="text-4xl font-bold mb-4">Ready to Deploy?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              This high-end design system is production-ready and integrated with RessellerPro. Deploy now and go live.
            </p>
            <motion.a
              href="https://github.com/Mind-Reply/resellerpro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-xl hover:shadow-cyan-500/50 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              Deploy RessellerPro
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </GlassmorphicCard>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-md bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-400">
          <p>RessellerPro Design System © 2026 | High-End Logo & Web Design</p>
          <p className="mt-2">Summer 2026 Trends: Glassmorphism • Kinetic Typography • Animated Gradients • Micro-interactions</p>
        </div>
      </footer>
    </div>
  );
}
