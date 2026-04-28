/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Fixed Cyberpunk Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Header / Navigation Bar */}
      <header className="relative z-10 w-full border-b border-white/5 backdrop-blur-md px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl rotate-12 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <span className="text-white font-black text-xl italic tracking-tighter">NP</span>
          </div>
          <div>
            <h1 
              className="text-2xl font-black text-white tracking-tighter font-digital animate-glitch"
              data-text="NEON PULSE"
            >
              NEON PULSE
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.2em] leading-none">System Version 2.0.4</p>
          </div>
        </div>
        
        <div className="hidden md:flex gap-8 text-[11px] font-medium text-white/40 uppercase tracking-widest">
          <a href="#" className="hover:text-cyan-400 transition-colors">Neural Net</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Grid Access</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Archived Bytes</a>
        </div>

        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-mono text-green-500/80 uppercase tracking-tight">Active Connection</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-12 gap-8 lg:gap-16">
        
        {/* Left Section: Stats/Info (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden xl:flex flex-col gap-12 w-64 pt-8"
        >
          <div className="space-y-4">
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono border-l border-white/20 pl-4">Objective</p>
            <h2 className="text-3xl font-bold text-white leading-tight font-digital">Harvest data nodes without firewall collision.</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Stability</span>
              <span className="text-sm font-mono text-cyan-400 font-digital">98.2%</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Latency</span>
              <span className="text-sm font-mono text-cyan-400 font-digital">12ms</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-wider">Entropy</span>
              <span className="text-sm font-mono text-purple-400 font-digital">Low</span>
            </div>
          </div>
        </motion.div>

        {/* Center Section: Snake Game */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          <SnakeGame />
          
          {/* Decorative Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl -translate-x-4 -translate-y-4" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/40 rounded-br-xl translate-x-4 translate-y-4" />
        </motion.div>

        {/* Right Section: Music Player */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MusicPlayer />
        </motion.div>

      </main>

      {/* Footer Meta Bar */}
      <footer className="relative z-10 w-full px-8 py-3 flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest border-t border-white/5">
        <div>© 2026 Neon Pulse Systems _ User: Jagadeeswari</div>
        <div className="flex gap-6">
          <span>Session: 0xFF92</span>
          <span className="text-cyan-500/40">Secure Node</span>
        </div>
      </footer>
    </div>
  );
}
