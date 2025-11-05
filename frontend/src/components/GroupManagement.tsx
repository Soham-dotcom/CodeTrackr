import { motion } from 'motion/react';
import { Users, Crown, Star, Award, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function GroupManagement() {
  const teamMembers = [
    { 
      id: 1, 
      name: 'Alex Chen', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      role: 'Lead Developer',
      hours: 42.5,
      streak: 15,
      isLead: true,
      progress: 85,
      angle: 0
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e48e?w=40&h=40&fit=crop&crop=face',
      role: 'Frontend Dev',
      hours: 38.2,
      streak: 12,
      isLead: false,
      progress: 76,
      angle: 60
    },
    { 
      id: 3, 
      name: 'Mike Rodriguez', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Backend Dev',
      hours: 35.8,
      streak: 18,
      isLead: false,
      progress: 71,
      angle: 120
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      role: 'UI/UX Designer',
      hours: 32.1,
      streak: 9,
      isLead: false,
      progress: 64,
      angle: 180
    },
    { 
      id: 5, 
      name: 'David Kim', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      role: 'DevOps Engineer',
      hours: 29.7,
      streak: 11,
      isLead: false,
      progress: 59,
      angle: 240
    },
    { 
      id: 6, 
      name: 'Lisa Wang', 
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
      role: 'QA Engineer',
      hours: 27.3,
      streak: 7,
      isLead: false,
      progress: 54,
      angle: 300
    },
  ];

  const teams = [
    { name: 'Frontend Squad', members: 4, progress: 78, color: 'blue' },
    { name: 'Backend Crew', members: 3, progress: 82, color: 'purple' },
    { name: 'Design Team', members: 2, progress: 65, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      {/* Team Orbit Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Users className="w-5 h-5" />
              Team Orbit - CodeTrackr Squad
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-8">
            <div className="relative w-80 h-80">
              {/* Center Hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-blue-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Users className="w-8 h-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse" />
              </motion.div>

              {/* Orbital Rings */}
              {[120, 160].map((radius, ringIndex) => (
                <motion.div
                  key={ringIndex}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-400/20 rounded-full"
                  style={{ width: radius, height: radius }}
                  animate={{ rotate: ringIndex % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 30 + ringIndex * 10, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* Team Members */}
              {teamMembers.map((member, index) => {
                const radius = index < 3 ? 60 : 80;
                const x = Math.cos((member.angle * Math.PI) / 180) * radius;
                const y = Math.sin((member.angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={member.id}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(${x - 20}px, ${y - 20}px)`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="relative group">
                      <Avatar className="w-10 h-10 border-2 border-purple-400/50 hover:border-blue-400 transition-colors">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      {member.isLead && (
                        <Crown className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400" />
                      )}

                      {/* Connection Lines */}
                      <svg
                        className="absolute top-5 left-5 pointer-events-none"
                        width="200"
                        height="200"
                        style={{ transform: 'translate(-50%, -50%)' }}
                      >
                        <motion.line
                          x1="0"
                          y1="0"
                          x2={-x}
                          y2={-y}
                          stroke="url(#connectionGradient)"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: index * 0.3, duration: 1 }}
                        />
                        <defs>
                          <linearGradient id="connectionGradient">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Tooltip */}
                      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-xs font-medium text-white">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                        <p className="text-xs text-blue-400">{member.hours}h this week</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-yellow-400">{member.streak} day streak</span>
                        </div>
                      </div>

                      {/* Progress Ring */}
                      <div className="absolute inset-0 w-10 h-10">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="rgba(147, 51, 234, 0.2)"
                            strokeWidth="2"
                            fill="transparent"
                          />
                          <motion.circle
                            cx="20"
                            cy="20"
                            r="18"
                            stroke="url(#progressGradient)"
                            strokeWidth="2"
                            fill="transparent"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: member.progress / 100 }}
                            transition={{ delay: index * 0.1, duration: 1 }}
                            style={{
                              pathLength: member.progress / 100,
                              strokeDasharray: "113.1",
                              strokeDashoffset: 113.1 * (1 - member.progress / 100),
                            }}
                          />
                          <defs>
                            <linearGradient id="progressGradient">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#a855f7" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Floating Particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${60 + i * 10}px 0px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team, index) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-white">{team.name}</h3>
                  <Award className={`w-5 h-5 text-${team.color}-400`} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{team.members} members</span>
                    <span className={`text-${team.color}-400`}>{team.progress}%</span>
                  </div>
                  
                  <div className="relative">
                    <Progress value={team.progress} className="h-2" />
                    <motion.div
                      className={`absolute inset-0 h-2 rounded-full bg-gradient-to-r from-${team.color}-400 to-${team.color}-600 opacity-80`}
                      initial={{ width: 0 }}
                      animate={{ width: `${team.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add New Member */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl border-dashed hover:border-purple-400/60 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300">
              <Plus className="w-5 h-5 mr-2" />
              Invite Team Member
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}