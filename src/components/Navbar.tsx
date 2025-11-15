import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, LogOut, Menu, X, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { isAuthenticated, user, setShowLoginModal, setShowSignupModal, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', color: 'hover:text-neon-blue' },
    { to: '/ai-studio', label: 'AI Studio', color: 'hover:text-neon-purple' },
    { to: '/community', label: 'Community', color: 'hover:text-neon-pink' },
    { to: '/subscription', label: 'Pricing', color: 'hover:text-neon-cyan' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 backdrop-blur-md"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label="AIVA World Home"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-neon-blue" aria-hidden="true" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">AIVA World</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1 ${
                  isActive(link.to) ? 'text-neon-blue font-semibold' : link.color
                }`}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isAuthenticated && user && (
              <Button
                variant="ghost"
                size="icon"
                className="touch-target relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full" aria-hidden="true" />
              </Button>
            )}

            {isAuthenticated && user ? (
              <>
                <div className="hidden md:flex items-center gap-3 mr-2">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-neon-cyan">{user.credits} credits</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                        <Avatar className="border-2 border-neon-blue cursor-pointer hover:border-neon-purple transition-colors">
                          <AvatarFallback className="bg-gradient-to-br from-neon-blue to-neon-purple">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[200px]">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/subscription">Subscription</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="text-foreground hover:text-neon-pink touch-target md:hidden"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-foreground hover:text-neon-blue hidden sm:inline-flex"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all hidden sm:inline-flex"
                  onClick={() => setShowSignupModal(true)}
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="touch-target md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive(link.to)
                        ? 'bg-neon-blue/20 text-neon-blue font-semibold'
                        : 'text-foreground/80 hover:bg-white/5'
                    }`}
                    aria-current={isActive(link.to) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-neon-blue to-neon-purple"
                      onClick={() => {
                        setShowSignupModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}