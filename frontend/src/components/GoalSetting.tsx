import { motion } from 'motion/react';
import { Target, Star, CheckCircle, Plus, Calendar, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function GoalSetting() {
  const goals = [
    {
      id: 1,
      title: 'Complete 40 hours this week',
      progress: 75,
      current: 30,
      target: 40,
      unit: 'hours',
      deadline: '3 days',
      isCompleted: false,
      priority: 'high',
      constellation: 'Ursa Major'
    },
    {
      id: 2,
      title: 'Maintain 15-day coding streak',
      progress: 93,
      current: 14,
      target: 15,
      unit: 'days',
      deadline: '1 day',
      isCompleted: false,
      priority: 'medium',
      constellation: 'Orion'
    },
    {
      id: 3,
      title: 'Master TypeScript fundamentals',
      progress: 100,
      current: 100,
      target: 100,
      unit: '%',
      deadline: 'Completed',
      isCompleted: true,
      priority: 'high',
      constellation: 'Leo'
    },
    {
      id: 4,
      title: 'Contribute to 3 open source projects',
      progress: 66,
      current: 2,
      target: 3,
      unit: 'projects',
      deadline: '2 weeks',
      isCompleted: false,
      priority: 'low',
      constellation: 'Cassiopeia'
    },
  ];

  const achievements = [
    { icon: '🔥', title: 'Week Warrior', unlocked: true },
    { icon: '⚡', title: 'Speed Coder', unlocked: true },
    { icon: '🌟', title: 'Streak Master', unlocked: false },
    { icon: '💎', title: 'Code Diamond', unlocked: false },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'pink';
      case 'medium': return 'purple';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Goals Constellation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
          {/* Cosmic Background */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
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
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Target className="w-5 h-5" />
              Goal Constellation
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal, index) => {
                const x = (index % 2) * 300 + 100;
                const y = Math.floor(index / 2) * 150 + 100;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <Card className={`${
                      goal.isCompleted 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : `bg-${getPriorityColor(goal.priority)}-500/10 border-${getPriorityColor(goal.priority)}-500/30`
                    } backdrop-blur-sm hover:border-opacity-50 transition-all group`}>
                      <CardContent className="p-4">
                        {/* Star Icon */}
                        <div className="flex items-center justify-between mb-3">
                          <motion.div
                            className={`p-2 rounded-full ${
                              goal.isCompleted 
                                ? 'bg-green-500/20' 
                                : `bg-${getPriorityColor(goal.priority)}-500/20`
                            }`}
                            animate={goal.isCompleted ? {} : { 
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={goal.isCompleted ? {} : { 
                              duration: 2, 
                              repeat: Infinity 
                            }}
                          >
                            {goal.isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <Star className={`w-5 h-5 text-${getPriorityColor(goal.priority)}-400`} />
                            )}
                          </motion.div>

                          <div className="text-xs text-gray-400">
                            {goal.constellation}
                          </div>
                        </div>

                        {/* Goal Info */}
                        <h3 className="font-medium text-white mb-2 text-sm">
                          {goal.title}
                        </h3>

                        {/* Progress */}
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">
                              {goal.current} / {goal.target} {goal.unit}
                            </span>
                            <span className={`text-${getPriorityColor(goal.priority)}-400`}>
                              {goal.progress}%
                            </span>
                          </div>
                          
                          <div className="relative">
                            <Progress value={goal.progress} className="h-2" />
                            <motion.div
                              className={`absolute inset-0 h-2 rounded-full bg-gradient-to-r ${
                                goal.isCompleted 
                                  ? 'from-green-400 to-green-600'
                                  : `from-${getPriorityColor(goal.priority)}-400 to-${getPriorityColor(goal.priority)}-600`
                              } opacity-80`}
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                            
                            {/* Shooting star effect for progress */}
                            {!goal.isCompleted && (
                              <motion.div
                                className="absolute top-0 h-2 w-4 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 rounded-full"
                                animate={{
                                  x: ['-100%', `${goal.progress}%`],
                                  opacity: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                              />
                            )}
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{goal.deadline}</span>
                        </div>

                        {/* Achievement Trail */}
                        {goal.isCompleted && (
                          <motion.div
                            className="absolute -top-2 -right-2"
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{ 
                              scale: [0, 1.2, 1],
                              rotate: [0, 360],
                            }}
                            transition={{ duration: 0.8 }}
                          >
                            <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                            
                            {/* Particle burst */}
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transformOrigin: '12px 0px',
                                }}
                                animate={{
                                  rotate: i * 60,
                                  scale: [0, 1, 0],
                                  opacity: [1, 0],
                                }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5,
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Connection Lines between goals */}
                    {index < goals.length - 1 && (
                      <svg className="absolute top-1/2 -right-3 w-6 h-6 pointer-events-none">
                        <motion.line
                          x1="0"
                          y1="12"
                          x2="24"
                          y2="12"
                          stroke="url(#goalConnection)"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: index * 0.3, duration: 1 }}
                        />
                        <defs>
                          <linearGradient id="goalConnection">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>
                      </svg>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Add New Goal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6"
            >
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Goal
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Star className="w-5 h-5" />
              Achievement Galaxy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`text-center p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                      : 'bg-slate-800/50 border-gray-600/30'
                  } transition-all hover:border-opacity-50`}
                >
                  <motion.div
                    className="text-3xl mb-2"
                    animate={achievement.unlocked ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={achievement.unlocked ? {
                      duration: 2,
                      repeat: Infinity,
                    } : {}}
                  >
                    {achievement.icon}
                  </motion.div>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </p>
                  
                  {achievement.unlocked && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}