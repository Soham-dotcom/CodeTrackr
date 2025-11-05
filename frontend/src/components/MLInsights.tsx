import { motion } from 'motion/react';
import { Brain, TrendingUp, Lightbulb, AlertTriangle, Zap, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

export function MLInsights() {
  const insights = [
    {
      id: 1,
      title: 'Peak Productivity Window',
      description: 'You code 40% more efficiently between 9-11 AM',
      confidence: 95,
      type: 'performance',
      icon: TrendingUp,
      color: 'green',
      recommendation: 'Schedule complex tasks during this time',
      impact: 'high'
    },
    {
      id: 2,
      title: 'Break Pattern Optimization',
      description: 'Taking breaks every 45 minutes increases focus by 25%',
      confidence: 87,
      type: 'wellness',
      icon: Lightbulb,
      color: 'blue',
      recommendation: 'Set 45-minute focus timers',
      impact: 'medium'
    },
    {
      id: 3,
      title: 'Language Switch Cost',
      description: 'Context switching between TypeScript and Python reduces efficiency by 15%',
      confidence: 78,
      type: 'workflow',
      icon: AlertTriangle,
      color: 'yellow',
      recommendation: 'Batch similar language tasks',
      impact: 'medium'
    },
    {
      id: 4,
      title: 'Collaboration Boost',
      description: 'Pair programming sessions show 60% better code quality',
      confidence: 92,
      type: 'collaboration',
      icon: Zap,
      color: 'purple',
      recommendation: 'Schedule 2 pair sessions per week',
      impact: 'high'
    }
  ];

  const productivityPrediction = [
    { time: '9 AM', predicted: 85, actual: 82 },
    { time: '10 AM', predicted: 92, actual: 89 },
    { time: '11 AM', predicted: 95, actual: 96 },
    { time: '12 PM', predicted: 78, actual: 75 },
    { time: '1 PM', predicted: 65, actual: 68 },
    { time: '2 PM', predicted: 88, actual: 85 },
    { time: '3 PM', predicted: 90, actual: 92 },
    { time: '4 PM', predicted: 85, actual: 87 },
    { time: '5 PM', predicted: 75, actual: 73 },
  ];

  const weeklyTrends = [
    { day: 'Mon', focus: 78, efficiency: 82, energy: 85 },
    { day: 'Tue', focus: 85, efficiency: 88, energy: 80 },
    { day: 'Wed', focus: 92, efficiency: 90, energy: 88 },
    { day: 'Thu', focus: 88, efficiency: 85, energy: 82 },
    { day: 'Fri', focus: 75, efficiency: 78, energy: 70 },
    { day: 'Sat', focus: 65, efficiency: 70, energy: 75 },
    { day: 'Sun', focus: 55, efficiency: 60, energy: 65 },
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'green';
    if (confidence >= 75) return 'blue';
    if (confidence >= 60) return 'yellow';
    return 'red';
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Brain className="w-5 h-5" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Holographic Card Effect */}
                  <div className={`relative p-4 rounded-lg border bg-gradient-to-br from-slate-800/50 to-slate-900/80 border-${insight.color}-500/30 backdrop-blur-sm overflow-hidden`}>
                    {/* Holographic Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-${insight.color}-500/20`}>
                          <insight.icon className={`w-5 h-5 text-${insight.color}-400`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`bg-${getConfidenceColor(insight.confidence)}-500/20 text-${getConfidenceColor(insight.confidence)}-400 border-${getConfidenceColor(insight.confidence)}-500/50 text-xs`}>
                            {insight.confidence}% confidence
                          </Badge>
                          <Badge className={`${insight.impact === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-blue-500/20 text-blue-400 border-blue-500/50'} text-xs`}>
                            {insight.impact} impact
                          </Badge>
                        </div>
                      </div>

                      <h3 className="font-medium text-white mb-2">{insight.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                      
                      <div className={`p-2 rounded border-l-4 border-${insight.color}-400 bg-${insight.color}-500/10`}>
                        <p className="text-xs text-gray-300">
                          💡 {insight.recommendation}
                        </p>
                      </div>

                      {/* Floating Data Points */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-${insight.color}-400 rounded-full opacity-60`}
                          style={{
                            right: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                          }}
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>

                    {/* Holographic Edge Effect */}
                    <div className={`absolute inset-0 border border-${insight.color}-400/20 rounded-lg`} />
                    <motion.div
                      className={`absolute inset-0 border border-${insight.color}-400/40 rounded-lg`}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Productivity Prediction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <BarChart3 className="w-5 h-5" />
              Real-time Productivity Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Prediction */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Today's Hourly Prediction vs Actual</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={productivityPrediction}>
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#a855f7"
                      strokeWidth={2}
                      strokeDasharray="5,5"
                      dot={{ fill: '#a855f7', strokeWidth: 2, r: 3 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded border-2 border-purple-400" style={{ borderStyle: 'dashed' }} />
                    <span className="text-xs text-gray-400">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span className="text-xs text-gray-400">Actual</span>
                  </div>
                </div>
              </div>

              {/* Weekly Trends */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Weekly Pattern Analysis</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyTrends}>
                    <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <defs>
                      <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="#ec4899"
                      fill="url(#focusGradient)"
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#60a5fa"
                      fill="url(#efficiencyGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500 rounded" />
                    <span className="text-xs text-gray-400">Focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span className="text-xs text-gray-400">Efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Model Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { name: 'Productivity Model', accuracy: '94.2%', status: 'active', color: 'green' },
          { name: 'Pattern Recognition', accuracy: '87.8%', status: 'learning', color: 'blue' },
          { name: 'Recommendation Engine', accuracy: '91.5%', status: 'optimizing', color: 'purple' },
        ].map((model, index) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <Card className={`bg-slate-900/80 border-${model.color}-500/20 backdrop-blur-xl hover:border-${model.color}-400/40 transition-colors`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Brain className={`w-5 h-5 text-${model.color}-400`} />
                  <Badge className={`bg-${model.color}-500/20 text-${model.color}-400 border-${model.color}-500/50`}>
                    {model.status}
                  </Badge>
                </div>
                <h3 className="font-medium text-white mb-1">{model.name}</h3>
                <p className="text-sm text-gray-400">Accuracy: {model.accuracy}</p>
                
                {/* Activity Indicator */}
                <motion.div
                  className={`mt-3 h-1 bg-${model.color}-500/20 rounded-full overflow-hidden`}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r from-${model.color}-400 to-${model.color}-600`}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}