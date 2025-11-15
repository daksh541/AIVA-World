import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Sparkles,
  TrendingUp,
  Heart,
  MessageSquare,
  Download,
  Star,
  Trophy,
  Users,
  Search,
  Filter,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAvatarStore } from '@/lib/store';
import { toast } from 'sonner';

export default function Community() {
  const { avatars, fetchAvatars, setSelectedAvatar } = useAvatarStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchAvatars().catch((error) => {
      console.warn('Failed to load avatars', error);
    });
  }, [fetchAvatars]);

  const fallbackAvatars = [
    {
      id: '1',
      name: 'Celestial Muse',
      creator: 'ArtistPro',
      likes: 1234,
      downloads: 567,
      price: 'Free',
      category: 'Anime',
    },
    {
      id: '2',
      name: 'Cyber Warrior',
      creator: 'TechMaster',
      likes: 2341,
      downloads: 892,
      price: '50 Credits',
      category: 'Realistic',
    },
    {
      id: '3',
      name: 'Dream Weaver',
      creator: 'FantasyKing',
      likes: 987,
      downloads: 432,
      price: 'Free',
      category: 'Anime',
    },
    {
      id: '4',
      name: 'Neon Phantom',
      creator: 'CyberQueen',
      likes: 3456,
      downloads: 1234,
      price: '100 Credits',
      category: 'Realistic',
    },
  ];

  const challenges = [
    {
      id: 1,
      title: 'Winter Fantasy Challenge',
      participants: 234,
      prize: '5000 Credits',
      deadline: '7 days left',
    },
    {
      id: 2,
      title: 'Sci-Fi Avatar Contest',
      participants: 456,
      prize: '10000 Credits',
      deadline: '14 days left',
    },
  ];

  const topCreators = [
    { name: 'ArtistPro', avatars: 45, followers: 12500 },
    { name: 'TechMaster', avatars: 38, followers: 9800 },
    { name: 'FantasyKing', avatars: 52, followers: 15600 },
  ];

  const dataSource = avatars.length ? avatars : fallbackAvatars;

  const filteredAvatars = dataSource.filter((avatar) => {
    const matchesSearch = avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         avatar.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || avatar.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinChallenge = (challengeId: number) => {
    toast.success('Successfully joined the challenge! Good luck! 🎉');
  };

  const handleFollowCreator = (creatorName: string) => {
    toast.success(`Now following ${creatorName}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4 flex items-center gap-3">
            <Users className="w-10 h-10" />
            Community Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover, share, and connect with creators worldwide
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-effect neon-border p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search avatars or creators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 neon-border bg-black/50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className={selectedCategory === 'all' ? 'bg-gradient-to-r from-neon-blue to-neon-purple' : 'neon-border'}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'anime' ? 'default' : 'outline'}
                  className={selectedCategory === 'anime' ? 'bg-gradient-to-r from-neon-blue to-neon-cyan' : 'neon-border'}
                  onClick={() => setSelectedCategory('anime')}
                >
                  Anime
                </Button>
                <Button
                  variant={selectedCategory === 'realistic' ? 'default' : 'outline'}
                  className={selectedCategory === 'realistic' ? 'bg-gradient-to-r from-neon-purple to-neon-pink' : 'neon-border'}
                  onClick={() => setSelectedCategory('realistic')}
                >
                  Realistic
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Avatars */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-neon-blue" />
                  Trending Avatars
                </h2>
                <Button variant="outline" className="neon-border" onClick={() => toast.info('Showing all avatars')}>
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAvatars.map((avatar, index) => (
                  <motion.div
                    key={avatar.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-effect neon-border overflow-hidden hover:shadow-neon transition-all duration-300 group cursor-pointer">
                      <div 
                        className="aspect-video bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 flex items-center justify-center relative overflow-hidden"
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Sparkles className="w-20 h-20 text-neon-purple" />
                        </motion.div>
                        <Badge className="absolute top-3 right-3 bg-neon-blue/80 text-white border-0">
                          {avatar.category}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-all">
                          {avatar.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          by {avatar.creator}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm">
                            <button 
                              className="flex items-center gap-1 hover:text-neon-pink transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.success('Added to favorites!');
                              }}
                            >
                              <Heart className="w-4 h-4 text-neon-pink" />
                              {avatar.likes}
                            </button>
                            <span className="flex items-center gap-1">
                              <Download className="w-4 h-4 text-neon-cyan" />
                              {avatar.downloads}
                            </span>
                          </div>
                          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50">
                            {avatar.price}
                          </Badge>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-neon-blue to-neon-purple"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAvatar(avatar);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Creator Challenges */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-neon-pink" />
                Active Challenges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-effect neon-border p-6 hover:shadow-neon-pink transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <Trophy className="w-8 h-8 text-neon-pink" />
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                          {challenge.deadline}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Prize Pool</span>
                          <span className="font-bold text-neon-cyan">{challenge.prize}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Participants</span>
                          <span className="font-bold text-neon-purple">
                            {challenge.participants}
                          </span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-neon-pink to-neon-purple"
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        Join Challenge
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Discussion Forum Preview */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-neon-cyan" />
                Recent Discussions
              </h2>
              <Card className="glass-effect neon-border p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 pb-4 border-b border-white/10 last:border-0 cursor-pointer hover:bg-white/5 p-3 rounded-lg transition-all"
                      onClick={() => toast.info('Opening discussion...')}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple">
                          U{i}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">
                          Best practices for avatar animation?
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Looking for tips on creating smooth animations...
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>User{i}</span>
                          <span>•</span>
                          <span>2 hours ago</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {12 + i}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 neon-border"
                  onClick={() => toast.info('Loading all discussions...')}
                >
                  View All Discussions
                </Button>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Creators */}
            <Card className="glass-effect neon-border p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-neon-blue" />
                Top Creators
              </h3>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                    onClick={() => handleFollowCreator(creator.name)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-pink">
                          {index + 1}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{creator.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {creator.avatars} avatars
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-neon-cyan">
                        {(creator.followers / 1000).toFixed(1)}K
                      </p>
                      <p className="text-xs text-muted-foreground">followers</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Community Stats */}
            <Card className="glass-effect neon-border p-6">
              <h3 className="text-xl font-bold mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-neon-blue/10 rounded-lg">
                  <div className="text-3xl font-bold text-neon-blue mb-1">50K+</div>
                  <div className="text-xs text-muted-foreground">Total Avatars</div>
                </div>
                <div className="text-center p-4 bg-neon-purple/10 rounded-lg">
                  <div className="text-3xl font-bold text-neon-purple mb-1">25K+</div>
                  <div className="text-xs text-muted-foreground">Active Creators</div>
                </div>
                <div className="text-center p-4 bg-neon-pink/10 rounded-lg">
                  <div className="text-3xl font-bold text-neon-pink mb-1">1M+</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}