import { motion } from 'motion/react';
import { Lightbulb, Coffee, Target, Zap, Clock, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function RecommendationBubbles() {
  const recommendations = [
    {
      id: 1,
      title: 'Take a break',
      message: "You've been coding for 2 hours straight. A 15-minute break could boost your productivity.",
      icon: Coffee,
      type: 'wellness',
      priority: 'medium',
      color: 'yellow',
      position: { x: 20, y: 15 },
      orbitRadius: 60,
      delay: 0
    },
    {
      id: 2,
      title: 'Focus time',
      message: 'Your most productive hours are coming up. Consider tackling complex tasks now.',
      icon: Target,
      type: 'productivity',
      priority: 'high',
      color: 'green',
      position: { x: 80, y: 25 },
      orbitRadius: 80,
      delay: 0.5
    },
    {
      id: 3,
      title: 'Pair programming',
      message: 'Sarah is also working on React. Consider a quick collaboration session.',
      icon: Users,
      type: 'collaboration',
      priority: 'low',
      color: 'blue',
      position: { x: 15, y: 70 },
      orbitRadius: 70,
      delay: 1
    },
    {
      id: 4,
      title: 'Code review',
      message: 'You have 3 pending PRs. Reviewing them now could help your team stay unblocked.',
      icon: Zap,
      type: 'workflow',
      priority: 'medium',
      color: 'purple',
      position: { x: 70, y: 80 },
      orbitRadius: 65,
      delay: 1.5
    },
    {
      id: 5,
      title: 'Meeting reminder',
      message: 'Team standup in 30 minutes. Prepare your updates.',
      icon: Clock,
      type: 'schedule',
      priority: 'high',
      color: 'pink',
      position: { x: 50, y: 50 },
      orbitRadius: 50,
      delay: 2
    }
  ];

  const getPriorityScale = (priority: string) => {
    switch (priority) {
      case 'high': return 1.2;
      case 'medium': return 1.0;
      case 'low': return 0.8;
      default: return 1.0;
    }
  };

  const getPriorityGlow = (priority: string) => {
    switch (priority) {
      case 'high': return '0 0 20px rgba(239, 68, 68, 0.4)';
      case 'medium': return '0 0 15px rgba(59, 130, 246, 0.3)';
      case 'low': return '0 0 10px rgba(156, 163, 175, 0.2)';
      default: return 'none';
    }
  };

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Background Cosmic Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central Gravitational Point */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "backOut" }}
      >
        <Lightbulb className="w-8 h-8 text-white" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Orbiting Recommendation Bubbles */}
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          className="absolute"
          style={{
            left: `calc(50% + ${Math.cos((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius}px)`,
            top: `calc(50% + ${Math.sin((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius}px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: getPriorityScale(rec.priority),
          }}
          transition={{ delay: rec.delay, duration: 0.8, ease: "backOut" }}
        >
          {/* Orbital Motion */}
          <motion.div
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              duration: 20 + index * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ 
              transformOrigin: `${-Math.cos((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius}px ${-Math.sin((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius}px` 
            }}
          >
            <motion.div
              style={{ 
                transform: `translate(-50%, -50%)`,
              }}
            >
              <Card 
                className={`bg-slate-900/90 border-${rec.color}-500/30 backdrop-blur-xl hover:border-${rec.color}-400/50 transition-all cursor-pointer group relative`}
                style={{ 
                  boxShadow: getPriorityGlow(rec.priority),
                  width: '200px'
                }}
              >
                {/* Floating Animation */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <motion.div
                        className={`p-2 rounded-lg bg-${rec.color}-500/20 shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 15 }}
                      >
                        <rec.icon className={`w-4 h-4 text-${rec.color}-400`} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white mb-1">
                          {rec.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {rec.message}
                        </p>
                      </div>
                    </div>

                    {/* Priority Indicator */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${
                      rec.priority === 'high' ? 'red' : 
                      rec.priority === 'medium' ? 'yellow' : 'blue'
                    }-500 rounded-full border-2 border-slate-900`}>
                      {rec.priority === 'high' && (
                        <motion.div
                          className="absolute inset-0 bg-red-500 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Interaction Ripple */}
                    <motion.div
                      className={`absolute inset-0 bg-${rec.color}-400/10 rounded-lg opacity-0 group-hover:opacity-100`}
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </CardContent>
                </motion.div>

                {/* Connection Line to Center */}
                <svg 
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: rec.orbitRadius + 50,
                    height: rec.orbitRadius + 50,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.line
                    x1="50%"
                    y1="50%"
                    x2={`${50 + (Math.cos((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius / (rec.orbitRadius + 50)) * 50}%`}
                    y2={`${50 + (Math.sin((rec.delay * 60) * Math.PI / 180) * rec.orbitRadius / (rec.orbitRadius + 50)) * 50}%`}
                    stroke={`url(#connectionGradient${rec.id})`}
                    strokeWidth="1"
                    strokeDasharray="2,4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: rec.delay + 0.5 }}
                  />
                  <defs>
                    <linearGradient id={`connectionGradient${rec.id}`}>
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                      <stop offset="100%" stopColor={`var(--color-${rec.color}-400)`} stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Particle Trail */}
                {rec.priority === 'high' && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-${rec.color}-400 rounded-full`}
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        animate={{
                          x: [0, Math.random() * 40 - 20],
                          y: [0, Math.random() * 40 - 20],
                          opacity: [1, 0],
                          scale: [1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Orbital Paths Visualization */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {recommendations.map((rec) => (
          <motion.div
            key={`orbit-${rec.id}`}
            className="absolute border border-purple-400/10 rounded-full"
            style={{
              width: rec.orbitRadius * 2,
              height: rec.orbitRadius * 2,
              left: -rec.orbitRadius,
              top: -rec.orbitRadius,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: rec.delay + 1, duration: 1 }}
          />
        ))}
      </div>
    </div>
  );
}