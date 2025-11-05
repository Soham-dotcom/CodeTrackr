import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Code, Zap } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  const quotes = [
    "First, solve the problem. Then, write the code.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Clean code always looks like it was written by someone who cares.",
    "Coding like poetry should be short and concise.",
    "The best error message is the one that never shows up.",
    "Code is like humor. When you have to explain it, it's bad."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        
        {/* Multiple nebula layers */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 60% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)
              `
            }}
          />
        </div>

        {/* Animated stars */}
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{ x: -10, y: 100 + i * 150, opacity: 0 }}
            animate={{ 
              x: window.innerWidth + 10, 
              y: 200 + i * 150, 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 8 + i * 2,
              ease: "easeInOut" 
            }}
            style={{
              boxShadow: '0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)'
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "backOut" }}
          >
            <div className="relative">
              <Code className="w-12 h-12 text-blue-400" />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              CodeTrackr
            </motion.h1>
            <div className="relative">
              <Zap className="w-12 h-12 text-pink-400" />
              <motion.div
                className="absolute -inset-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full blur opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Track. Analyze. Compete. Level-up your coding journey.
          </motion.p>
        </motion.div>

        {/* Rotating Quotes */}
        <motion.div
          className="mb-12 h-32 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="relative max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentQuote}
                initial={{ opacity: 0, y: 20, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl lg:text-2xl text-gray-200 italic font-light leading-relaxed"
                style={{ 
                  textShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
                  transformStyle: 'preserve-3d'
                }}
              >
                "{quotes[currentQuote]}"
              </motion.blockquote>
            </AnimatePresence>
            
            {/* Quote indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {quotes.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentQuote ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                  animate={index === currentQuote ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="relative px-8 py-4 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 border-0 rounded-xl group overflow-hidden"
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 blur"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative flex items-center gap-2">
                <Play className="w-5 h-5" />
                Get Started
              </div>
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 text-gray-400 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 group-hover:text-yellow-400 transition-colors" />
            <span className="group-hover:text-white transition-colors">Join 10,000+ developers</span>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="w-16 h-16 border border-purple-400/20 rounded-lg backdrop-blur-sm bg-slate-900/20 flex items-center justify-center">
                <Code className="w-8 h-8 text-purple-400/60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center"
          animate={{ borderColor: ['rgba(168, 85, 247, 0.5)', 'rgba(168, 85, 247, 1)', 'rgba(168, 85, 247, 0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-purple-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}