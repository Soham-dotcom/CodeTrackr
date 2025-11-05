import { motion } from 'motion/react';
import { Play, Pause, Clock, Code2, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

export function RealTimeTracker() {
  const languages = [
    { name: 'TypeScript', time: '2h 45m', color: 'from-blue-400 to-blue-600', percentage: 45 },
    { name: 'React', time: '1h 30m', color: 'from-cyan-400 to-cyan-600', percentage: 25 },
    { name: 'Python', time: '45m', color: 'from-green-400 to-green-600', percentage: 15 },
    { name: 'CSS', time: '30m', color: 'from-purple-400 to-purple-600', percentage: 15 },
  ];

  const totalTime = "5h 32m";
  const activeProject = "CodeTrackr Dashboard";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Activity Ring */}
      <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Clock className="w-5 h-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              className="w-48 h-48 rounded-full border-8 border-slate-800"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Progress Ring */}
            <motion.div
              className="absolute inset-0 w-48 h-48 rounded-full border-8 border-transparent border-t-blue-400 border-r-purple-400 border-b-pink-400"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{
                background: `conic-gradient(from 0deg, #60a5fa 0%, #a855f7 50%, #ec4899 75%, transparent 100%)`,
                borderRadius: '50%',
                mask: 'radial-gradient(closest-side, transparent 79%, black 80%)',
                WebkitMask: 'radial-gradient(closest-side, transparent 79%, black 80%)',
              }}
            />

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {totalTime}
                </div>
                <div className="text-sm text-gray-400 mt-1">Total Time</div>
                <motion.div
                  className="mt-3 flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/50"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-3 h-3 text-green-400" />
                  <span className="text-xs text-green-400">Active</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '96px 0px',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language Breakdown */}
      <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Code2 className="w-5 h-5" />
            Language Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-400 mb-4">
            Active Project: <span className="text-blue-400">{activeProject}</span>
          </div>
          
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{lang.name}</span>
                <span className="text-sm text-gray-400">{lang.time}</span>
              </div>
              <div className="relative">
                <Progress value={lang.percentage} className="h-2" />
                <motion.div
                  className={`absolute inset-0 h-2 rounded-full bg-gradient-to-r ${lang.color} opacity-80`}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
                <motion.div
                  className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full shadow-lg"
                  style={{ right: `${100 - lang.percentage}%` }}
                  animate={{ 
                    boxShadow: [
                      '0 0 5px rgba(255, 255, 255, 0.5)',
                      '0 0 15px rgba(255, 255, 255, 0.8)',
                      '0 0 5px rgba(255, 255, 255, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}

          {/* Status Indicators */}
          <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-700">
            <motion.div 
              className="flex items-center gap-2"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-green-400">Coding</span>
            </motion.div>
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-400">Last break: 45m ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}