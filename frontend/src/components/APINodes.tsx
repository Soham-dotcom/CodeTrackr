import { motion } from 'motion/react';
import { Database, Zap, Shield, Globe, Server, Cloud, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function APINodes() {
  const apiEndpoints = [
    {
      id: 1,
      name: 'Time Tracking API',
      endpoint: '/api/v1/tracking',
      method: 'GET/POST',
      status: 'active',
      requests: '2.4k/day',
      latency: '45ms',
      icon: Database,
      connections: [2, 3],
      position: { x: 0, y: 0 },
      color: 'blue'
    },
    {
      id: 2,
      name: 'Analytics Engine',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      status: 'active',
      requests: '1.8k/day',
      latency: '62ms',
      icon: Zap,
      connections: [4, 5],
      position: { x: 1, y: 0 },
      color: 'purple'
    },
    {
      id: 3,
      name: 'User Management',
      endpoint: '/api/v1/users',
      method: 'CRUD',
      status: 'active',
      requests: '956/day',
      latency: '38ms',
      icon: Shield,
      connections: [4],
      position: { x: 0, y: 1 },
      color: 'green'
    },
    {
      id: 4,
      name: 'Team Collaboration',
      endpoint: '/api/v1/teams',
      method: 'GET/POST',
      status: 'active',
      requests: '1.2k/day',
      latency: '51ms',
      icon: Globe,
      connections: [6],
      position: { x: 1, y: 1 },
      color: 'pink'
    },
    {
      id: 5,
      name: 'Integration Hub',
      endpoint: '/api/v1/integrations',
      method: 'GET/POST',
      status: 'maintenance',
      requests: '743/day',
      latency: '89ms',
      icon: Server,
      connections: [],
      position: { x: 2, y: 0 },
      color: 'yellow'
    },
    {
      id: 6,
      name: 'Data Export',
      endpoint: '/api/v1/export',
      method: 'GET',
      status: 'active',
      requests: '421/day',
      latency: '156ms',
      icon: Cloud,
      connections: [],
      position: { x: 2, y: 1 },
      color: 'cyan'
    }
  ];

  const enterpriseFeatures = [
    {
      title: 'Enterprise SSO',
      description: 'SAML, OAuth, LDAP integration',
      status: 'available',
      icon: Shield
    },
    {
      title: 'Rate Limiting',
      description: 'Advanced API throttling',
      status: 'active',
      icon: Zap
    },
    {
      title: 'Custom Webhooks',
      description: 'Real-time event streaming',
      status: 'available',
      icon: Database
    },
    {
      title: 'White-label API',
      description: 'Branded API documentation',
      status: 'coming-soon',
      icon: Globe
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'maintenance': return 'yellow';
      case 'error': return 'red';
      case 'available': return 'blue';
      case 'coming-soon': return 'purple';
      default: return 'gray';
    }
  };

  const getMethodColor = (method: string) => {
    if (method.includes('GET')) return 'blue';
    if (method.includes('POST')) return 'green';
    if (method.includes('CRUD')) return 'purple';
    return 'gray';
  };

  return (
    <div className="space-y-6">
      {/* API Network Diagram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
          {/* Cosmic Background */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
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

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Database className="w-5 h-5" />
              Enterprise API Network
            </CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>6 endpoints</span>
              <span>•</span>
              <span>99.9% uptime</span>
              <span>•</span>
              <span>Enterprise ready</span>
            </div>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
              {apiEndpoints.map((api, index) => (
                <motion.div
                  key={api.id}
                  initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.8, 
                    ease: "backOut" 
                  }}
                  className="relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Connection Lines */}
                  {api.connections.map((connectionId) => {
                    const targetApi = apiEndpoints.find(a => a.id === connectionId);
                    if (!targetApi) return null;

                    const deltaX = (targetApi.position.x - api.position.x) * 220;
                    const deltaY = (targetApi.position.y - api.position.y) * 180;
                    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

                    return (
                      <motion.div
                        key={connectionId}
                        className="absolute top-1/2 left-1/2 origin-left"
                        style={{
                          width: length,
                          height: '2px',
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                          transformOrigin: '0 50%',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1 + index * 0.1, duration: 1 }}
                      >
                        <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 relative">
                          {/* Data Flow Animation */}
                          <motion.div
                            className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                            animate={{ x: ['0%', '100%'] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: Math.random() * 2,
                            }}
                          />
                        </div>
                        
                        {/* Arrow */}
                        <ArrowRight 
                          className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 text-purple-400" 
                        />
                      </motion.div>
                    );
                  })}

                  {/* API Node */}
                  <motion.div
                    className={`relative p-4 rounded-xl border-2 ${
                      api.status === 'active' 
                        ? `border-${api.color}-400 bg-gradient-to-br from-${api.color}-500/20 to-${api.color}-600/20`
                        : api.status === 'maintenance'
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                        : 'border-red-400 bg-gradient-to-br from-red-500/20 to-red-600/20'
                    } backdrop-blur-sm transition-all duration-300 cursor-pointer min-h-[160px]`}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: `0 20px 40px rgba(${api.color === 'blue' ? '59, 130, 246' : api.color === 'purple' ? '168, 85, 247' : '34, 197, 94'}, 0.3)`
                    }}
                  >
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`bg-${getStatusColor(api.status)}-500/20 text-${getStatusColor(api.status)}-400 border-${getStatusColor(api.status)}-500/50 text-xs`}>
                        {api.status}
                      </Badge>
                      <Badge className={`bg-${getMethodColor(api.method)}-500/20 text-${getMethodColor(api.method)}-400 border-${getMethodColor(api.method)}-500/50 text-xs`}>
                        {api.method}
                      </Badge>
                    </div>

                    {/* Icon */}
                    <motion.div 
                      className={`inline-flex p-3 rounded-lg bg-${api.color}-500/20 mb-3`}
                      animate={api.status === 'active' ? {
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={api.status === 'active' ? {
                        duration: 3,
                        repeat: Infinity,
                      } : {}}
                    >
                      <api.icon className={`w-6 h-6 text-${api.color}-400`} />
                    </motion.div>

                    {/* Details */}
                    <h3 className="font-medium text-white mb-1 text-sm">
                      {api.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-3 font-mono">
                      {api.endpoint}
                    </p>

                    {/* Metrics */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-gray-400">
                        <span>Requests:</span>
                        <span className="text-white">{api.requests}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Latency:</span>
                        <span className={`${
                          parseInt(api.latency) < 50 ? 'text-green-400' :
                          parseInt(api.latency) < 100 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {api.latency}
                        </span>
                      </div>
                    </div>

                    {/* Active Status Animation */}
                    {api.status === 'active' && (
                      <>
                        {/* Pulse Ring */}
                        <motion.div
                          className={`absolute inset-0 border-2 border-${api.color}-400 rounded-xl`}
                          animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5] 
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Data Particles */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${api.color}-400 rounded-full`}
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '30px 0px',
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.5, 1],
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Maintenance Warning */}
                    {api.status === 'maintenance' && (
                      <motion.div
                        className="absolute inset-0 border-2 border-yellow-400 rounded-xl"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enterprise Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield className="w-5 h-5" />
              Enterprise Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {enterpriseFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    feature.status === 'active' || feature.status === 'available'
                      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30'
                      : 'bg-slate-800/50 border-gray-600/30'
                  } hover:border-opacity-50 transition-all group`}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`p-2 rounded-lg ${
                        feature.status === 'active' || feature.status === 'available'
                          ? 'bg-blue-500/20'
                          : 'bg-gray-500/20'
                      }`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <feature.icon className={`w-5 h-5 ${
                        feature.status === 'active' || feature.status === 'available'
                          ? 'text-blue-400'
                          : 'text-gray-400'
                      }`} />
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {feature.description}
                      </p>
                      <Badge className={`bg-${getStatusColor(feature.status)}-500/20 text-${getStatusColor(feature.status)}-400 border-${getStatusColor(feature.status)}-500/50 text-xs`}>
                        {feature.status === 'coming-soon' ? 'Coming Soon' : feature.status}
                      </Badge>
                    </div>
                  </div>

                  {(feature.status === 'active' || feature.status === 'available') && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-lg opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.9 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
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