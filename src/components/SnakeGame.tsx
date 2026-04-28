import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSnake } from '../hooks/useSnake';
import { GRID_SIZE } from '../constants';
import { cn } from '../lib/utils';
import { Trophy, Play, Pause, RefreshCcw } from 'lucide-react';

export const SnakeGame: React.FC = () => {
  const { snake, food, isGameOver, score, isPaused, setIsPaused, resetGame } = useSnake();

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden group">
      {/* Neon Glow Effects */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full group-hover:bg-cyan-500/30 transition-colors" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full group-hover:bg-purple-500/30 transition-colors" />

      {/* Header */}
      <div className="w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30 animate-pulse">
            <Trophy className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Score</p>
            <p 
              className="text-4xl font-black text-white font-digital animate-glitch" 
              data-text={score.toString().padStart(4, '0')}
            >
              {score.toString().padStart(4, '0')}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={cn(
            "p-3 rounded-full transition-all duration-300 border backdrop-blur-md",
            isPaused 
              ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30" 
              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
          )}
        >
          {isPaused ? <Play fill="currentColor" className="w-6 h-6" /> : <Pause fill="currentColor" className="w-6 h-6" />}
        </button>
      </div>

      {/* Grid Container */}
      <div 
        className="relative border-4 border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] shadow-inner"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Snake Body */}
        {snake.map((segment, index) => (
          <motion.div
            key={`${index}-${segment.x}-${segment.y}`}
            layoutId={`${index}-${segment.x}-${segment.y}`}
            className={cn(
              "absolute w-5 h-5 rounded-[4px] z-20",
              index === 0 
                ? "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-30" 
                : "bg-cyan-600/60"
            )}
            style={{
              left: segment.x * 20,
              top: segment.y * 20,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute w-5 h-5 flex items-center justify-center z-10"
          style={{
            left: food.x * 20,
            top: food.y * 20,
          }}
        >
          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
        </motion.div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-40" />
      </div>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-8 text-center"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 uppercase italic tracking-tighter mb-2 font-digital animate-glitch"
              data-text="SYSTEM FAILURE"
            >
              System Failure
            </motion.h2>
            <p className="text-white/60 font-mono mb-8 uppercase tracking-[0.2em]">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
            >
              <RefreshCcw className="w-5 h-5" />
              Reboot System
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Hint */}
      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
        ARROWS TO NAVIGATE • SPACE TO PAUSE
      </p>
    </div>
  );
};
