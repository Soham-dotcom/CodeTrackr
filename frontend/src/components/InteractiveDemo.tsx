import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Play, Pause, BarChart3, Users, Trophy, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export function InteractiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDemo, setActiveDemo] = useState('tracking');
  const [isPlaying, setIsPlaying] = useState(false);

  const demos = [
    { id: 'tracking', label: 'Real-Time Tracking', icon: Play },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'teams', label: 'Team Collaboration', icon: Users },
    { id: 'leaderboard', label: 'Leaderboards', icon: Trophy },
    { id: 'goals', label: 'Goal Setting', icon: Target },
  ];

  const trackingData = {
    totalTime: "5h 32m",
    languages: [
      { name: 'TypeScript', time: '2h 45m', percentage: 50, color: 'blue' },
      { name: 'React', time: '1h 30m', percentage: 27, color: 'cyan' },
      { name: 'Python', time: '45m', percentage: 14, color: 'green' },
      { name: 'CSS', time: '32m', percentage: 9, color: 'purple' },
    ]
  };

  const teamData = [
    { name: 'Alex Chen', hours: 42.5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Sarah Kim', hours: 38.2, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e48e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Mike Rodriguez', hours: 35.8, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
  ];

  const leaderboardData = [
    { rank: 1, name: 'CodeMaster', points: 2580, badge: '👑' },
    { rank: 2, name: 'DevNinja', points: 2340, badge: '🥈' },
    { rank: 3, name: 'ByteWizard', points: 2190, badge: '🥉' },
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'tracking':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Today's Activity</h3>
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-yellow-500'}`}
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm text-gray-400">
                  {isPlaying ? 'Coding' : 'Break'}
                </span>
              </div>
            </div>

            <div className="text-center">
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                key={isPlaying ? 'playing' : 'paused'}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {trackingData.totalTime}
              </motion.div>
              <p className="text-gray-400 mt-2">Total coding time</p>
            </div>

            <div className="space-y-3">
              {trackingData.languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{lang.name}</span>
                    <span className="text-gray-400">{lang.time}</span>
                  </div>
                  <div className="relative">
                    <Progress value={lang.percentage} className="h-2" />
                    <motion.div
                      className={`absolute inset-0 h-2 rounded-full bg-gradient-to-r from-${lang.color}-400 to-${lang.color}-600 opacity-80`}
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'teams':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Team Progress</h3>
            <div className="space-y-4">
              {teamData.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-purple-500/20"
                >
                  <Avatar className="w-10 h-10 border-2 border-purple-400/50">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.hours}h this week</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${(member.hours / 50) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'leaderboard':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Global Leaderboard</h3>
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  user.rank === 1 
                    ? 'bg-yellow-500/10 border-yellow-500/30' 
                    : 'bg-slate-800/50 border-purple-500/20'
                }`}
              >
                <span className="text-2xl">{user.badge}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">Rank #{user.rank}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-400">
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <BarChart3 className="w-12 h-12 text-purple-400" />
            </motion.div>
            <p className="text-gray-400">Select a feature to see it in action</p>
          </div>
        );
    }
  };

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            See CodeTrackr in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of our analytics platform with interactive demos of key features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Controls */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Try Features</h3>
            {demos.map((demo, index) => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  activeDemo === demo.id
                    ? 'bg-purple-600/20 border-purple-400/50 text-purple-300'
                    : 'bg-slate-800/50 border-purple-500/20 text-gray-400 hover:border-purple-400/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <demo.icon className="w-5 h-5" />
                  <span className="font-medium">{demo.label}</span>
                  {activeDemo === demo.id && (
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}

            {/* Play/Pause Control */}
            <motion.div
              className="mt-6 pt-6 border-t border-purple-500/20"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Demo
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Demo
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Demo Display */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-96 bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
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

              <CardContent className="p-8 h-full relative z-10">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  {renderDemo()}
                </motion.div>
              </CardContent>

              {/* Status indicator */}
              <div className="absolute top-4 right-4">
                <Badge className={`${isPlaying ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}`}>
                  {isPlaying ? 'Live Demo' : 'Paused'}
                </Badge>
              </div>
            </Card>

            {/* Call to Action */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <p className="text-gray-400 mb-4">
                Ready to track your coding journey?
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}