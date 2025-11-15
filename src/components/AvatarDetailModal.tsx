import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAvatarStore } from '@/lib/store';
import { Sparkles, Download, Heart, Share2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function AvatarDetailModal() {
  const { selectedAvatar, showAvatarModal, setShowAvatarModal } = useAvatarStore();

  if (!selectedAvatar) return null;

  const handleDownload = () => {
    toast.success('Avatar downloaded successfully!');
  };

  const handleLike = () => {
    toast.success('Added to favorites!');
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Dialog open={showAvatarModal} onOpenChange={setShowAvatarModal}>
      <DialogContent className="glass-effect neon-border border-neon-purple/50 max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            {selectedAvatar.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Avatar Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-2xl flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-32 h-32 text-neon-purple" />
            </motion.div>
            <Badge className="absolute top-4 right-4 bg-neon-blue/80 text-white border-0">
              {selectedAvatar.category}
            </Badge>
          </motion.div>

          {/* Avatar Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Creator</h3>
              <p className="text-muted-foreground">{selectedAvatar.creator}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">
                {selectedAvatar.description ||
                  'A beautifully crafted avatar with stunning details and personality. Features advanced AI-driven interactions and customizable voice profiles.'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center p-3 glass-effect rounded-lg flex-1">
                <div className="text-2xl font-bold text-neon-pink">{selectedAvatar.likes}</div>
                <div className="text-xs text-muted-foreground">Likes</div>
              </div>
              <div className="text-center p-3 glass-effect rounded-lg flex-1">
                <div className="text-2xl font-bold text-neon-cyan">{selectedAvatar.downloads}</div>
                <div className="text-xs text-muted-foreground">Downloads</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Price</h3>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/50 text-lg px-4 py-2">
                {selectedAvatar.price}
              </Badge>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Get Avatar
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="neon-border"
                  onClick={handleLike}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="neon-border"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="neon-border"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}