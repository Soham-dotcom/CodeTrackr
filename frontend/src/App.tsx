import { motion } from 'motion/react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureShowcase } from './components/FeatureShowcase';
import { InteractiveDemo } from './components/InteractiveDemo';
import { FutureFeatures } from './components/FutureFeatures';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden dark">
      {/* Global Cosmic Background */}
      <CosmicBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Showcase */}
        <FeatureShowcase />
        
        {/* Interactive Demo */}
        <InteractiveDemo />
        
        {/* Future Features */}
        <FutureFeatures />
        
        {/* Footer */}
        <Footer />
      </div>

      {/* Global Cosmic Effects */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Additional floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </div>
  );
}