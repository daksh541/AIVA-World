import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  Send,
  Smile,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatRoomProps {
  avatarName?: string;
  onClose?: () => void;
}

export function ChatRoom({ avatarName = 'Avatar', onClose }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm ${avatarName}. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [callDuration, setCallDuration] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isCallActive) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      setCallDuration(0);
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isCallActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `That's interesting! Tell me more about "${inputValue}".`,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    toast.success('Call started');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast.info('Call ended');
  };

  const handleToggleMic = () => {
    setIsMicMuted(!isMicMuted);
    toast.info(!isMicMuted ? 'Microphone muted' : 'Microphone unmuted');
  };

  const handleToggleVolume = () => {
    setIsVolumeMuted(!isVolumeMuted);
    toast.info(!isVolumeMuted ? 'Volume muted' : 'Volume unmuted');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Header */}
      <div className="glass-effect border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <span className="text-xl font-bold text-white">{avatarName.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{avatarName}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isCallActive ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Call Active</span>
                    <span>•</span>
                    <span>{formatCallDuration(callDuration)}</span>
                  </>
                ) : (
                  <span>Online</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isCallActive && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                {connectionQuality === 'excellent' ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : connectionQuality === 'good' ? (
                  <Wifi className="w-4 h-4 text-yellow-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs capitalize">{connectionQuality}</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="touch-target" aria-label="Settings">
              <Settings className="w-5 h-5" />
            </Button>
            {onClose && (
              <Button variant="ghost" size="icon" className="touch-target" onClick={onClose} aria-label="Close">
                <PhoneOff className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Avatar Display Area */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-neon-blue/10 via-neon-purple/10 to-neon-pink/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isCallActive ? [1, 1.05, 1] : 1,
                opacity: isCallActive ? [0.8, 1, 0.8] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isCallActive ? Infinity : 0,
              }}
              className="text-center"
            >
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4 shadow-2xl">
                <span className="text-6xl md:text-8xl font-bold text-white">{avatarName.charAt(0)}</span>
              </div>
              {isCallActive && !isMicMuted && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="flex justify-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [20, 40, 20],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      className="w-1 bg-neon-blue rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col glass-effect">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-neon-blue to-neon-cyan text-white'
                        : 'bg-white/10 text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-2 h-2 bg-neon-blue rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1"
                aria-label="Message input"
              />
              <Button
                variant="ghost"
                size="icon"
                className="touch-target"
                aria-label="Emoji picker"
              >
                <Smile className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-neon-blue to-neon-purple touch-target"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>

            {/* Call Controls */}
            <Card className="p-4 bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Call Controls</span>
                {isCallActive ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleEndCall}
                    className="touch-target"
                    aria-label="End call"
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    End Call
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleStartCall}
                    className="bg-gradient-to-r from-neon-blue to-neon-cyan touch-target"
                    aria-label="Start call"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Start Call
                  </Button>
                )}
              </div>

              {isCallActive && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isMicMuted ? 'destructive' : 'outline'}
                      size="icon"
                      onClick={handleToggleMic}
                      className="touch-target"
                      aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
                    >
                      {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant={isVolumeMuted ? 'outline' : 'outline'}
                      size="icon"
                      onClick={handleToggleVolume}
                      className="touch-target"
                      aria-label={isVolumeMuted ? 'Unmute volume' : 'Mute volume'}
                    >
                      {isVolumeMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                  </div>
                  {!isVolumeMuted && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>Volume</span>
                        <span>{volume[0]}%</span>
                      </div>
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full"
                        aria-label="Volume control"
                      />
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

