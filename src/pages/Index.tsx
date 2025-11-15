import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Lock, Mic, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Driven Interactions',
      description: 'Advanced neural networks power realistic conversations and behaviors',
      color: 'text-neon-blue',
    },
    {
      icon: Sparkles,
      title: 'Personalized Avatars',
      description: 'Customize every detail from appearance to personality traits',
      color: 'text-neon-purple',
    },
    {
      icon: Mic,
      title: 'Immersive Voice + Motion',
      description: 'Real-time voice synthesis with natural body language',
      color: 'text-neon-pink',
    },
    {
      icon: Lock,
      title: 'Encrypted Privacy',
      description: 'Bank-level encryption ensures your data stays completely private',
      color: 'text-neon-cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />
      <main id="main-content">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-pink/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 text-gradient glow-text"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AIVA World
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl mb-4 text-foreground/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Intelligent, Custom, Virtual Companions
            </motion.p>
            <motion.p
              className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Design, personalize, and interact with fully AI-driven avatars—your world, your imagination.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link to="/ai-studio">
                <Button
                  size="lg"
                  className="text-lg px-12 py-8 bg-gradient-to-r from-neon-blue to-neon-cyan hover:shadow-neon transition-all duration-300 group"
                >
                  <span className="mr-2">✨</span>
                  Anime Realm
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
              <Link to="/ai-studio">
                <Button
                  size="lg"
                  className="text-lg px-12 py-8 bg-gradient-to-r from-neon-purple to-neon-pink hover:shadow-neon-purple transition-all duration-300"
                >
                  <span className="mr-2">🌟</span>
                  Realistic Realm
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Revolutionary Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="glass-effect neon-border p-8 hover:shadow-neon transition-all duration-300 group cursor-pointer h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="glass-effect neon-border rounded-3xl p-12 md:p-16 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Ready to Enter AIVA World?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators and experience the future of virtual companionship
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="text-lg px-12 py-8 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink hover:shadow-neon-purple transition-all duration-300"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}