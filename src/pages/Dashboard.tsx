import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Mic,
  Film,
  MessageSquare,
  Users,
  Settings,
  Plus,
  TrendingUp,
  Star,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const studios = [
    {
      icon: Sparkles,
      title: 'AI Studio',
      description: 'Create and customize avatars',
      color: 'from-neon-blue to-neon-cyan',
      link: '/ai-studio',
    },
    {
      icon: Mic,
      title: 'Voice Studio',
      description: 'Design unique voice profiles',
      color: 'from-neon-purple to-neon-pink',
      link: '/ai-studio',
    },
    {
      icon: Film,
      title: 'Animation Lab',
      description: 'Create custom animations',
      color: 'from-neon-pink to-neon-purple',
      link: '/ai-studio',
    },
    {
      icon: MessageSquare,
      title: 'Live Interaction',
      description: 'Chat with your avatars',
      color: 'from-neon-cyan to-neon-blue',
      link: '/ai-studio',
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Explore and share',
      color: 'from-neon-blue to-neon-purple',
      link: '/community',
    },
    {
      icon: Settings,
      title: 'Creator Dashboard',
      description: 'Manage your creations',
      color: 'from-neon-purple to-neon-cyan',
      link: '/dashboard',
    },
  ];

  const recentActivity = [
    { action: 'Created new avatar', time: '2 hours ago', type: 'create' },
    { action: 'Updated voice profile', time: '5 hours ago', type: 'update' },
    { action: 'Shared to community', time: '1 day ago', type: 'share' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />
      <main id="main-content">
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect neon-border rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-neon-blue">
              <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple text-2xl">
                AI
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gradient mb-2">Welcome Back, Creator</h1>
              <p className="text-muted-foreground mb-3">
                Continue building your virtual world
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="bg-neon-blue/20 text-neon-blue border-neon-blue/50">
                  Premium Member
                </Badge>
                <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50">
                  5 Avatars Created
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="glass-effect rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-neon-cyan">1,250</div>
                <div className="text-sm text-muted-foreground">Credits</div>
              </div>
              <Link to="/subscription">
                <Button className="w-full bg-gradient-to-r from-neon-blue to-neon-purple">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credits
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Studios Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gradient flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Your Studios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studios.map((studio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={studio.link}>
                      <Card className="glass-effect neon-border p-6 hover:shadow-neon transition-all duration-300 cursor-pointer group h-full">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${studio.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <studio.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                          {studio.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{studio.description}</p>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* My Avatars */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gradient flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  My Avatars
                </h2>
                <Link to="/ai-studio">
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-pink">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="glass-effect neon-border p-4 hover:shadow-neon-purple transition-all cursor-pointer"
                  >
                    <div className="aspect-square bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg mb-3 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-neon-purple" />
                    </div>
                    <h4 className="font-semibold mb-1">Avatar {i}</h4>
                    <p className="text-sm text-muted-foreground">Last edited 2d ago</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <Card className="glass-effect neon-border p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neon-cyan" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-effect neon-border p-6">
              <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Avatars</span>
                  <span className="text-xl font-bold text-neon-blue">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Interactions</span>
                  <span className="text-xl font-bold text-neon-purple">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Community Shares</span>
                  <span className="text-xl font-bold text-neon-pink">23</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}