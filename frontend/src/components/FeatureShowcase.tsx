import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Clock, BarChart3, Users, Trophy, Target, Smartphone, Brain, Link } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function FeatureShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Monitor your coding activity with precision. Track active/idle status, duration, and language breakdown with beautiful animated progress rings.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      demo: "ActivityRings"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Visualize your productivity with interactive charts. Daily, weekly, and monthly insights with language and project breakdowns.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      demo: "Analytics"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Form coding groups with orbital avatar displays. Track team progress and create accountability through social features.",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      demo: "TeamOrbit"
    },
    {
      icon: Trophy,
      title: "Global Leaderboards",
      description: "Compete with developers worldwide. Cosmic particle effects, glowing badges, and achievement highlights make competition fun.",
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      demo: "Leaderboard"
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set coding goals that appear as constellation stars. Achievement trails and comet notifications keep you motivated.",
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      demo: "Goals"
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Machine learning analyzes your patterns to provide productivity recommendations and predict optimal coding times.",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-500",
      demo: "AIInsights"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Powerful Features for Modern Developers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how CodeTrackr transforms your coding workflow with immersive analytics, 
            social features, and AI-powered insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
              whileHover={{ y: -10, rotateY: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="relative h-full bg-slate-900/80 border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-${feature.color}-400 rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 relative`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur opacity-50`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Interactive Demo Hint */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-sm">Interactive demo available</span>
                  </motion.div>
                </CardContent>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Demo Previews */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Smartphone, label: "Mobile Sync" },
              { icon: Link, label: "Integrations" },
              { icon: Brain, label: "AI Powered" },
              { icon: Trophy, label: "Gamified" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-400/40 transition-colors group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <item.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}