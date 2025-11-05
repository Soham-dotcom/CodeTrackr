import { motion } from 'motion/react';
import { Link, Zap, CheckCircle, Clock, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function IntegrationsShowcase() {
  const integrations = [
    {
      id: 1,
      name: 'Jira',
      description: 'Project management and issue tracking',
      logo: '🔷',
      status: 'connected',
      lastSync: '2 minutes ago',
      tasksTracked: 24,
      color: 'blue',
      features: ['Time tracking', 'Issue sync', 'Sprint reports'],
      position: { x: 0, y: 0 }
    },
    {
      id: 2,
      name: 'Trello',
      description: 'Visual project management',
      logo: '📋',
      status: 'connected',
      lastSync: '5 minutes ago',
      tasksTracked: 18,
      color: 'purple',
      features: ['Card tracking', 'Board sync', 'Progress updates'],
      position: { x: 1, y: 0 }
    },
    {
      id: 3,
      name: 'GitHub',
      description: 'Code repository and collaboration',
      logo: '🐙',
      status: 'connected',
      lastSync: 'Just now',
      tasksTracked: 156,
      color: 'green',
      features: ['Commit tracking', 'PR analytics', 'Repo insights'],
      position: { x: 2, y: 0 }
    },
    {
      id: 4,
      name: 'Slack',
      description: 'Team communication platform',
      logo: '💬',
      status: 'connected',
      lastSync: '1 minute ago',
      tasksTracked: 42,
      color: 'pink',
      features: ['Status updates', 'Notifications', 'Team sync'],
      position: { x: 0, y: 1 }
    },
    {
      id: 5,
      name: 'Notion',
      description: 'All-in-one workspace',
      logo: '📝',
      status: 'pending',
      lastSync: 'Not synced',
      tasksTracked: 0,
      color: 'yellow',
      features: ['Page tracking', 'Database sync', 'Note analysis'],
      position: { x: 1, y: 1 }
    },
    {
      id: 6,
      name: 'Linear',
      description: 'Modern issue tracking',
      logo: '⚡',
      status: 'available',
      lastSync: 'Not connected',
      tasksTracked: 0,
      color: 'gray',
      features: ['Issue tracking', 'Cycle reports', 'Team metrics'],
      position: { x: 2, y: 1 }
    }
  ];

  const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const totalTasks = connectedIntegrations.reduce((sum, i) => sum + i.tasksTracked, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green';
      case 'pending': return 'yellow';
      case 'available': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'pending': return 'Pending';
      case 'available': return 'Available';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Network */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
          {/* Floating Background Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Link className="w-5 h-5" />
              Integration Network
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{connectedIntegrations.length} connected</span>
              <span>•</span>
              <span>{totalTasks} tasks tracked</span>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, scale: 0, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: "backOut" }}
                  className="relative group"
                >
                  {/* Connection Lines */}
                  {integration.status === 'connected' && (
                    <>
                      {/* Horizontal connections */}
                      {integration.position.x < 2 && (
                        <svg className="absolute top-1/2 -right-3 w-6 h-6 pointer-events-none">
                          <motion.line
                            x1="0"
                            y1="12"
                            x2="24"
                            y2="12"
                            stroke="url(#integrationGradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1 + index * 0.1, duration: 1 }}
                          />
                        </svg>
                      )}
                      
                      {/* Vertical connections */}
                      {integration.position.y === 0 && (
                        <svg className="absolute -bottom-3 left-1/2 w-6 h-6 pointer-events-none transform -translate-x-1/2">
                          <motion.line
                            x1="12"
                            y1="0"
                            x2="12"
                            y2="24"
                            stroke="url(#integrationGradient)"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1 + index * 0.1, duration: 1 }}
                          />
                        </svg>
                      )}
                    </>
                  )}

                  {/* Integration Card */}
                  <motion.div
                    className={`relative p-4 rounded-xl border-2 ${
                      integration.status === 'connected' 
                        ? `border-${integration.color}-400 bg-gradient-to-br from-${integration.color}-500/20 to-${integration.color}-600/20`
                        : integration.status === 'pending'
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                        : 'border-gray-500 bg-gradient-to-br from-gray-500/20 to-gray-600/20'
                    } backdrop-blur-sm transition-all duration-300 cursor-pointer`}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 10,
                      boxShadow: `0 20px 40px rgba(${integration.color === 'blue' ? '96, 165, 250' : integration.color === 'purple' ? '168, 85, 247' : integration.color === 'green' ? '34, 197, 94' : integration.color === 'pink' ? '236, 72, 153' : '156, 163, 175'}, 0.3)`
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Status Indicator */}
                    <div className={`absolute -top-2 -right-2 w-4 h-4 bg-${getStatusColor(integration.status)}-500 rounded-full border-2 border-slate-900 flex items-center justify-center`}>
                      {integration.status === 'connected' && <CheckCircle className="w-2 h-2 text-white" />}
                      {integration.status === 'pending' && <Clock className="w-2 h-2 text-white" />}
                      {integration.status === 'available' && <Settings className="w-2 h-2 text-white" />}
                    </div>

                    {/* Logo */}
                    <motion.div 
                      className="text-3xl mb-2 text-center"
                      animate={integration.status === 'connected' ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={integration.status === 'connected' ? {
                        duration: 3,
                        repeat: Infinity,
                      } : {}}
                    >
                      {integration.logo}
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-sm font-medium text-white text-center mb-1">
                      {integration.name}
                    </h3>

                    {/* Status Badge */}
                    <div className="flex justify-center mb-2">
                      <Badge className={`bg-${getStatusColor(integration.status)}-500/20 text-${getStatusColor(integration.status)}-400 border-${getStatusColor(integration.status)}-500/50 text-xs`}>
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>

                    {/* Stats */}
                    {integration.status === 'connected' && (
                      <div className="text-center text-xs text-gray-400">
                        <div>{integration.tasksTracked} tasks</div>
                        <div>{integration.lastSync}</div>
                      </div>
                    )}

                    {/* Hover Info */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800/90 border border-purple-500/30 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 min-w-48">
                      <p className="text-xs font-medium text-white mb-1">{integration.description}</p>
                      <div className="space-y-1">
                        {integration.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Flow Animation for Connected */}
                    {integration.status === 'connected' && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${integration.color}-400 rounded-full`}
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '20px 0px',
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Pulse Effect for Pending */}
                    {integration.status === 'pending' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-yellow-400 rounded-xl"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* SVG Definitions */}
            <svg width="0" height="0">
              <defs>
                <linearGradient id="integrationGradient">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="font-medium text-white">Quick Connect</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Connect more tools to get comprehensive insights into your development workflow.
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Browse Integrations
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-5 h-5 text-blue-400" />
              <h3 className="font-medium text-white">Sync Settings</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Configure how your integrations sync data and customize tracking preferences.
            </p>
            <Button variant="outline" className="w-full border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
              Manage Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}