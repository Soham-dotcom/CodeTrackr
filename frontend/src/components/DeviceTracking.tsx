import { motion } from 'motion/react';
import { Smartphone, Monitor, Cloud, Laptop, Tablet, Wifi, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function DeviceTracking() {
  const devices = [
    {
      id: 1,
      name: 'MacBook Pro',
      type: 'laptop',
      icon: Laptop,
      status: 'active',
      lastSeen: 'Now',
      hours: 5.2,
      location: 'Home Office',
      battery: 78,
      projects: ['CodeTrackr', 'Portfolio'],
      position: { x: 100, y: 80 }
    },
    {
      id: 2,
      name: 'iPhone 14 Pro',
      type: 'mobile',
      icon: Smartphone,
      status: 'synced',
      lastSeen: '2m ago',
      hours: 0.8,
      location: 'Mobile',
      battery: 92,
      projects: ['Quick Notes'],
      position: { x: 200, y: 150 }
    },
    {
      id: 3,
      name: 'iMac Studio',
      type: 'desktop',
      icon: Monitor,
      status: 'idle',
      lastSeen: '1h ago',
      hours: 2.1,
      location: 'Studio',
      battery: null,
      projects: ['Design System'],
      position: { x: 300, y: 100 }
    },
    {
      id: 4,
      name: 'iPad Air',
      type: 'tablet',
      icon: Tablet,
      status: 'offline',
      lastSeen: '3h ago',
      hours: 0.3,
      location: 'Living Room',
      battery: 45,
      projects: ['Research'],
      position: { x: 150, y: 200 }
    }
  ];

  const cloudServices = [
    {
      name: 'GitHub Codespaces',
      status: 'connected',
      hours: 1.5,
      projects: 2,
      icon: '🌐'
    },
    {
      name: 'Replit',
      status: 'connected',
      hours: 0.7,
      projects: 1,
      icon: '⚡'
    },
    {
      name: 'CodeSandbox',
      status: 'idle',
      hours: 0.0,
      projects: 0,
      icon: '📦'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'synced': return 'blue';
      case 'idle': return 'yellow';
      case 'offline': return 'gray';
      case 'connected': return 'purple';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'synced':
      case 'connected':
        return <Wifi className="w-3 h-3" />;
      case 'idle':
        return <Wifi className="w-3 h-3 opacity-50" />;
      case 'offline':
        return <WifiOff className="w-3 h-3" />;
      default:
        return <Wifi className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Network Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Wifi className="w-5 h-5" />
              Device Network
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <div className="relative h-80 w-full">
              {/* Central Hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-purple-400/50 relative">
                  <Cloud className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="text-center mt-2">
                  <p className="text-sm font-medium text-white">CodeTrackr</p>
                  <p className="text-xs text-gray-400">Sync Hub</p>
                </div>
              </motion.div>

              {/* Devices */}
              {devices.map((device, index) => {
                const centerX = 200;
                const centerY = 160;
                const angle = (index * 90) * (Math.PI / 180);
                const radius = 120;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={device.id}
                    className="absolute"
                    style={{ left: x - 40, top: y - 40 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {/* Connection Line */}
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        left: 40 - x + centerX,
                        top: 40 - y + centerY,
                        width: Math.abs(x - centerX) + 40,
                        height: Math.abs(y - centerY) + 40,
                      }}
                    >
                      <motion.line
                        x1={x < centerX ? Math.abs(x - centerX) : 0}
                        y1={y < centerY ? Math.abs(y - centerY) : 0}
                        x2={x < centerX ? 40 : Math.abs(x - centerX) + 40}
                        y2={y < centerY ? 40 : Math.abs(y - centerY) + 40}
                        stroke={device.status === 'active' ? '#60a5fa' : device.status === 'synced' ? '#a855f7' : '#6b7280'}
                        strokeWidth="2"
                        strokeDasharray={device.status === 'offline' ? '5,5' : '0'}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                      />
                    </svg>

                    {/* Device */}
                    <motion.div
                      className={`relative w-20 h-20 rounded-xl border-2 ${
                        device.status === 'active' 
                          ? 'border-green-400 bg-gradient-to-br from-green-500/20 to-green-600/20'
                          : device.status === 'synced'
                          ? 'border-blue-400 bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                          : device.status === 'idle'
                          ? 'border-yellow-400 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                          : 'border-gray-500 bg-gradient-to-br from-gray-500/20 to-gray-600/20'
                      } backdrop-blur-sm flex flex-col items-center justify-center p-2 group cursor-pointer`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <device.icon className={`w-6 h-6 text-${getStatusColor(device.status)}-400 mb-1`} />
                      <p className="text-xs text-white text-center leading-tight">{device.name}</p>
                      
                      {/* Status Indicator */}
                      <div className={`absolute -top-1 -right-1 w-4 h-4 bg-${getStatusColor(device.status)}-500 rounded-full flex items-center justify-center`}>
                        {getStatusIcon(device.status)}
                      </div>

                      {/* Battery (for mobile devices) */}
                      {device.battery && (
                        <div className="absolute -bottom-1 -left-1 text-xs">
                          <Badge className={`bg-${device.battery > 50 ? 'green' : device.battery > 20 ? 'yellow' : 'red'}-500/20 text-${device.battery > 50 ? 'green' : device.battery > 20 ? 'yellow' : 'red'}-400 border-${device.battery > 50 ? 'green' : device.battery > 20 ? 'yellow' : 'red'}-500/50 px-1 py-0 text-xs`}>
                            {device.battery}%
                          </Badge>
                        </div>
                      )}

                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800/90 border border-purple-500/30 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-xs text-white">{device.location}</p>
                        <p className="text-xs text-gray-400">{device.hours}h today</p>
                        <p className="text-xs text-gray-400">Last: {device.lastSeen}</p>
                      </div>

                      {/* Data Flow Animation */}
                      {device.status === 'active' && (
                        <motion.div
                          className="absolute inset-0 border-2 border-green-400 rounded-xl"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Floating Data Particles */}
                    {device.status === 'active' && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-green-400 rounded-full"
                            style={{
                              left: 40,
                              top: 40,
                            }}
                            animate={{
                              x: [0, (centerX - x) * 0.3, (centerX - x) * 0.6, centerX - x],
                              y: [0, (centerY - y) * 0.3, (centerY - y) * 0.6, centerY - y],
                              opacity: [1, 1, 0.5, 0],
                              scale: [1, 1.2, 0.8, 0],
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
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cloud Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-slate-900/80 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Cloud className="w-5 h-5" />
              Cloud Coding Environments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cloudServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${
                    service.status === 'connected'
                      ? 'bg-purple-500/10 border-purple-500/30'
                      : 'bg-slate-800/50 border-gray-600/30'
                  } hover:border-opacity-50 transition-all`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{service.icon}</span>
                      <h3 className="text-sm font-medium text-white">{service.name}</h3>
                    </div>
                    <Badge className={`bg-${getStatusColor(service.status)}-500/20 text-${getStatusColor(service.status)}-400 border-${getStatusColor(service.status)}-500/50`}>
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Hours today:</span>
                      <span className="text-white">{service.hours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active projects:</span>
                      <span className="text-white">{service.projects}</span>
                    </div>
                  </div>

                  {service.status === 'connected' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-lg"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
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