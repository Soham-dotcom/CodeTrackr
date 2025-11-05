import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { 
  Smartphone, 
  Cloud, 
  Brain, 
  Puzzle, 
  GitBranch, 
  Database, 
  Zap,
  Globe,
  Shield,
  Palette
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function FutureFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const futureFeatures = [
    {
      icon: Smartphone,
      title: "Mobile & Cloud IDE Tracking",
      description: "Seamless tracking across mobile devices and cloud development environments like GitHub Codespaces, Replit, and CodeSandbox.",
      status: "In Development",
      timeline: "Q2 2024",
      color: "blue",
      connections: ["cloud", "sync"]
    },
    {
      icon: Brain,
      title: "Advanced AI Insights",
      description: "Personalized productivity recommendations, code quality predictions, and optimal break time suggestions powered by machine learning.",
      status: "Research Phase",
      timeline: "Q3 2024",
      color: "purple",
      connections: ["analytics", "predictions"]
    },
    {
      icon: Puzzle,
      title: "Jira & Trello Integration",
      description: "Connect your project management tools to automatically track time against specific tickets, stories, and project milestones.",
      status: "Coming Soon",
      timeline: "Q1 2024",
      color: "green",
      connections: ["workflow", "automation"]
    },
    {
      icon: GitBranch,
      title: "Git Repository Analytics",
      description: "Deep insights into your commit patterns, branch management, and code contribution across multiple repositories and organizations.",
      status: "Planned",
      timeline: "Q4 2024",
      color: "orange",
      connections: ["version-control", "analysis"]
    },
    {
      icon: Database,
      title: "Enterprise API Platform",
      description: "Comprehensive REST API with webhook support, custom integrations, and enterprise-grade security for team deployments.",
      status: "Beta",
      timeline: "Available Now",
      color: "indigo",
      connections: ["enterprise", "api"]
    },
    {
      icon: Globe,
      title: "Global Developer Communities",
      description: "Join language-specific communities, participate in coding challenges, and connect with developers who share your technology stack.",
      status: "Concept",
      timeline: "2025",
      color: "pink",
      connections: ["social", "community"]
    }
  ];

  const upcomingIntegrations = [
    { name: "VS Code", icon: "🔷", status: "Active" },
    { name: "JetBrains", icon: "🧠", status: "Beta" },
    { name: "Vim/Neovim", icon: "⚡", status: "Coming Soon" },
    { name: "Sublime Text", icon: "🌟", status: "Planned" },
    { name: "Atom", icon: "⚛️", status: "Planned" },
    { name: "Emacs", icon: "🔥", status: "Requested" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available Now":
      case "Beta": return "green";
      case "In Development":
      case "Coming Soon": return "blue";
      case "Research Phase": return "purple";
      case "Planned": return "yellow";
      case "Concept": return "gray";
      default: return "gray";
    }
  };

  return (
    <section ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900" />
        
        {/* Connection lines background */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="#a855f7" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating tech icons */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-400/20 text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['⚡', '🚀', '💡', '🔮', '⭐', '🌟'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            The Future of Code Tracking
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore upcoming features and integrations that will revolutionize how you track, 
            analyze, and optimize your development workflow.
          </p>
        </motion.div>

        {/* Future Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {futureFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Card className="h-full bg-slate-900/80 border-purple-500/20 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300 relative overflow-hidden">
                {/* Status glow */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                {/* Connection visualization */}
                <div className="absolute top-4 right-4">
                  <div className="flex gap-1">
                    {feature.connections.map((conn, i) => (
                      <motion.div
                        key={conn}
                        className={`w-2 h-2 bg-${feature.color}-400 rounded-full opacity-60`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <CardContent className="p-8 relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 relative`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                      <motion.div
                        className={`absolute inset-0 bg-${feature.color}-400 rounded-xl blur opacity-50`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {feature.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge className={`bg-${getStatusColor(feature.status)}-500/20 text-${getStatusColor(feature.status)}-400 border-${getStatusColor(feature.status)}-500/50`}>
                          {feature.status}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500/50 text-gray-400">
                          {feature.timeline}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Progress indicator for in-development features */}
                  {(feature.status === "In Development" || feature.status === "Beta") && (
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Development Progress</span>
                        <span>{feature.status === "Beta" ? "85%" : "60%"}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { 
                            width: feature.status === "Beta" ? "85%" : "60%" 
                          } : {}}
                          transition={{ delay: 1 + index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Data flow animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-${feature.color}-400 rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        x: [0, 50, 100],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Editor Integrations */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8">
            Editor & IDE Integrations
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {upcomingIntegrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                className="group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-4 bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all text-center">
                  <CardContent className="p-0">
                    <motion.div 
                      className="text-3xl mb-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {integration.icon}
                    </motion.div>
                    <h4 className="text-sm font-medium text-white mb-2">
                      {integration.name}
                    </h4>
                    <Badge 
                      className={`text-xs bg-${getStatusColor(integration.status)}-500/20 text-${getStatusColor(integration.status)}-400 border-${getStatusColor(integration.status)}-500/50`}
                    >
                      {integration.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
          >
            <p className="text-gray-400 mb-6">
              Have a feature request or want to integrate with your favorite tool?
            </p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Feature
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}