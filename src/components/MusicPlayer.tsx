import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';
import { cn } from '../lib/utils';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(p || 0);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
      <audio ref={audioRef} />
      
      {/* Animated Background Pulse */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Album Art Section */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentTrack.id}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Dynamic Vinyl Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        
        {/* Playback Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
           <div className="flex gap-1">
             {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying ? { height: [4, 16, 8, 12, 4] } : { height: 4 }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                  className="w-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                />
             ))}
           </div>
           <div className="p-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
              <Music className="w-4 h-4 text-white/60" />
           </div>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex flex-col items-center text-center gap-1">
        <motion.h3 
          key={`title-${currentTrack.id}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-bold text-white tracking-tight font-digital"
        >
          {currentTrack.title}
        </motion.h3>
        <motion.p 
          key={`artist-${currentTrack.id}`}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-medium text-cyan-400/80 uppercase tracking-widest font-digital"
        >
          {currentTrack.artist}
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-tighter">
          <span>{Math.floor((audioRef.current?.currentTime || 0) / 60)}:{(Math.floor((audioRef.current?.currentTime || 0) % 60)).toString().padStart(2, '0')}</span>
          <span>{Math.floor((audioRef.current?.duration || 0) / 60)}:{(Math.floor((audioRef.current?.duration || 0) % 60)).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4">
        <button onClick={prevTrack} className="p-3 text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-95">
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? <Pause className="w-8 h-8" fill="currentColor" /> : <Play className="w-8 h-8 ml-1" fill="currentColor" />}
        </button>

        <button onClick={nextTrack} className="p-3 text-white/40 hover:text-white transition-colors hover:scale-110 active:scale-95">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Volume Visualizer (Mock) */}
      <div className="flex items-center gap-3 px-6 pb-2 opacity-40">
        <Volume2 className="w-4 h-4 text-white" />
        <div className="flex-1 h-[2px] bg-white/10 rounded-full" />
      </div>
    </div>
  );
};
