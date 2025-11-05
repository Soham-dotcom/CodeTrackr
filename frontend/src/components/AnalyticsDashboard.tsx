import { motion } from 'motion/react';
import { TrendingUp, Calendar, Target, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export function AnalyticsDashboard() {
  const weeklyData = [
    { day: 'Mon', hours: 4.5, focus: 85 },
    { day: 'Tue', hours: 6.2, focus: 92 },
    { day: 'Wed', hours: 5.8, focus: 78 },
    { day: 'Thu', hours: 7.1, focus: 88 },
    { day: 'Fri', hours: 5.5, focus: 82 },
    { day: 'Sat', hours: 3.2, focus: 90 },
    { day: 'Sun', hours: 2.8, focus: 95 },
  ];

  const projectData = [
    { name: 'CodeTrackr', value: 35, color: '#60a5fa' },
    { name: 'E-commerce App', value: 25, color: '#a855f7' },
    { name: 'Portfolio Site', value: 20, color: '#ec4899' },
    { name: 'Open Source', value: 15, color: '#10b981' },
    { name: 'Learning', value: 5, color: '#f59e0b' },
  ];

  const monthlyData = [
    { month: 'Jan', hours: 120, productivity: 78 },
    { month: 'Feb', hours: 135, productivity: 82 },
    { month: 'Mar', hours: 158, productivity: 85 },
    { month: 'Apr', hours: 142, productivity: 88 },
    { month: 'May', hours: 165, productivity: 91 },
    { month: 'Jun', hours: 178, productivity: 87 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'This Week', value: '34.8h', change: '+12%', icon: Calendar, color: 'blue' },
          { title: 'Avg Focus', value: '87%', change: '+5%', icon: Target, color: 'purple' },
          { title: 'Streak', value: '15 days', change: '+3', icon: TrendingUp, color: 'pink' },
          { title: 'Projects', value: '8 active', change: '+2', icon: Activity, color: 'green' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm text-${stat.color}-400`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-500/20 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Activity className="w-5 h-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ fill: '#60a5fa', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#a855f7', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Target className="w-5 h-5" />
                Project Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {projectData.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-xs text-gray-400">{project.name}</span>
                    <span className="text-xs text-gray-300">{project.value}%</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-400">
              <TrendingUp className="w-5 h-5" />
              6-Month Productivity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Bar 
                  dataKey="hours" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}