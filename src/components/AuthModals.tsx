import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/store';
import { Sparkles, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export function LoginModal() {
  const { showLoginModal, setShowLoginModal, setShowSignupModal, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setIsSubmitting(true);
      await login(email, password);
      toast.success('Welcome back to AIVA World!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sign in';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="glass-effect neon-border border-neon-blue/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Welcome Back
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Sign in to continue your journey in AIVA World
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neon-blue" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-neon-purple" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon disabled:opacity-70"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              type="button"
              onClick={switchToSignup}
              className="text-neon-blue hover:text-neon-cyan transition-colors font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SignupModal() {
  const { showSignupModal, setShowSignupModal, setShowLoginModal, signup } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      setIsSubmitting(true);
      await signup(name, email, password);
      toast.success('Welcome to AIVA World! 🎉');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create account';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  return (
    <Dialog open={showSignupModal} onOpenChange={setShowSignupModal}>
      <DialogContent className="glass-effect neon-border border-neon-purple/50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Join AIVA World
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create your account and start building amazing avatars
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSignup} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4 text-neon-cyan" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-neon-blue" />
              Email
            </Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-neon-purple" />
              Password
            </Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-neon-pink" />
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="neon-border bg-black/50"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-neon-purple disabled:opacity-70"
          >
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              type="button"
              onClick={switchToLogin}
              className="text-neon-purple hover:text-neon-pink transition-colors font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}