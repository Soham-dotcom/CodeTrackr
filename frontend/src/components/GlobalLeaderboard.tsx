import { motion } from 'motion/react';
import { Trophy, Crown, Medal, Zap, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

export function GlobalLeaderboard() {
  const topCoders = [
    {
      rank: 1,
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      hours: 52.8,
      streak: 23,
      points: 2580,
      country: 'US',
      badges: ['🔥', '💎', '⚡'],
      isRising: false
    },
    {
      rank: 2,
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e48e?w=40&h=40&fit=crop&crop=face',
      hours: 48.2,
      streak: 19,
      points: 2340,
      country: 'KR',
      badges: ['🚀', '💻', '🎯'],
      isRising: true
    },
    {
      rank: 3,
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      hours: 45.7,
      streak: 15,
      points: 2190,
      country: 'UK',
      badges: ['⭐', '🏆', '💡'],
      isRising: false
    },
    {
      rank: 4,
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      hours: 43.1,
      streak: 12,
      points: 2050,
      country: 'ES',
      badges: ['🌟', '🎨', '💜'],
      isRising: true
    },
    {
      rank: 5,
      name: 'David Wang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      hours: 41.5,
      streak: 18,
      points: 1980,
      country: 'CN',
      badges: ['🔮', '⚙️', '🌈'],
      isRising: false
    }
  ];

  const achievements = [
    { title: 'Code Warrior', description: '100+ hours this month', icon: Zap, color: 'yellow' },
    { title: 'Streak Master', description: '20+ day streak', icon: Star, color: 'blue' },
    { title: 'Team Player', description: 'Top team contributor', icon: Award, color: 'purple' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 via-orange-400 to-red-400';
      case 2: return 'from-gray-300 via-gray-400 to-gray-500';
      case 3: return 'from-amber-400 via-amber-500 to-amber-600';
      default: return 'from-purple-400 to-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
          {/* Cosmic Particles Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Trophy className="w-6 h-6" />
              Global Leaderboard
              <Badge className="ml-auto bg-green-500/20 text-green-400 border-green-500/50">
                Live
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 relative z-10">
            {topCoders.map((coder, index) => (
              <motion.div
                key={coder.rank}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-lg border ${
                  coder.rank === 1 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                    : coder.rank === 2
                    ? 'bg-gradient-to-r from-gray-300/10 to-gray-500/10 border-gray-400/30'
                    : coder.rank === 3
                    ? 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/30'
                    : 'bg-slate-800/50 border-purple-500/20'
                } hover:border-opacity-50 transition-all group`}
              >
                {/* Rank Glow Effect */}
                {coder.rank <= 3 && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getRankGradient(coder.rank)} opacity-5 rounded-lg`} />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(coder.rank)}
                  </div>

                  {/* Avatar with Glow */}
                  <div className="relative">
                    <Avatar className={`w-12 h-12 border-2 ${
                      coder.rank === 1 ? 'border-yellow-400' : 
                      coder.rank === 2 ? 'border-gray-300' :
                      coder.rank === 3 ? 'border-amber-500' :
                      'border-purple-400'
                    }`}>
                      <AvatarImage src={coder.avatar} />
                      <AvatarFallback className={`bg-gradient-to-br ${getRankGradient(coder.rank)}`}>
                        {coder.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    {coder.rank <= 3 && (
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${getRankGradient(coder.rank)} opacity-20 blur-sm`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {coder.isRising && (
                      <motion.div
                        className="absolute -top-1 -right-1 text-green-400"
                        animate={{ y: [-2, -6, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ↗️
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{coder.name}</h3>
                      <span className="text-xs text-gray-400">{coder.country}</span>
                      {coder.isRising && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                          Rising
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                      <span>{coder.hours}h this week</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        {coder.streak} days
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-1 mt-2">
                      {coder.badges.map((badge, i) => (
                        <motion.span
                          key={i}
                          className="text-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        >
                          {badge}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      coder.rank === 1 ? 'text-yellow-400' :
                      coder.rank === 2 ? 'text-gray-300' :
                      coder.rank === 3 ? 'text-amber-500' :
                      'text-purple-400'
                    }`}>
                      {coder.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>

                {/* Particle Trail Effect for Top 3 */}
                {coder.rank <= 3 && (
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${getRankGradient(coder.rank)}`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: '50%',
                        }}
                        animate={{
                          x: [0, 100, 200, 300],
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-colors group">
              <CardContent className="p-6 text-center">
                <motion.div
                  className={`inline-flex p-3 rounded-full bg-${achievement.color}-500/20 mb-3 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <achievement.icon className={`w-6 h-6 text-${achievement.color}-400`} />
                </motion.div>
                <h3 className="font-medium text-white mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}