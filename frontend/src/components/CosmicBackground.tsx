import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  speed: number;
}

export function CosmicBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          brightness: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Nebula Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)
          `
        }}
      />

      {/* Parallax Mouse Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1) 0%, transparent 30%)`
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />

      {/* Animated Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            opacity: star.brightness,
          }}
          initial={{ x: star.x, y: star.y }}
          animate={{
            x: star.x + Math.sin(Date.now() * 0.001 * star.speed) * 2,
            y: star.y + Math.cos(Date.now() * 0.001 * star.speed) * 2,
            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
          }}
          transition={{
            duration: 3 + star.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      <motion.div
        className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
        initial={{ x: -10, y: 50, opacity: 0 }}
        animate={{ 
          x: window.innerWidth + 10, 
          y: 200, 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 5,
          ease: "easeInOut" 
        }}
        style={{
          boxShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)'
        }}
      />
    </div>
  );
}