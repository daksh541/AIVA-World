import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Crown, Rocket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/store';

export default function Subscription() {
  const { isAuthenticated, setShowLoginModal } = useAuthStore();

  const plans = [
    {
      name: 'Free',
      icon: Sparkles,
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      color: 'from-neon-blue to-neon-cyan',
      features: [
        '1 Avatar creation',
        'Basic customization',
        '100 interactions/month',
        'Community access',
        'Standard voice profiles',
        'Basic animations',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '$19.99',
      period: 'per month',
      description: 'For serious creators',
      color: 'from-neon-purple to-neon-pink',
      features: [
        'Unlimited avatars',
        'Full AI Studio access',
        'Unlimited interactions',
        'Priority support',
        'Advanced voice synthesis',
        'Custom animations',
        'HD rendering',
        'Export capabilities',
        'No watermarks',
      ],
      cta: 'Upgrade Now',
      popular: true,
    },
    {
      name: 'Creator Pro',
      icon: Rocket,
      price: '$49.99',
      period: 'per month',
      description: 'For professional creators',
      color: 'from-neon-cyan to-neon-blue',
      features: [
        'Everything in Premium',
        'Upload & sell assets',
        'Revenue sharing (70/30)',
        'Advanced analytics',
        'API access',
        'Custom AI training',
        'White-label options',
        'Dedicated support',
        'Early feature access',
      ],
      cta: 'Go Pro',
      popular: false,
    },
  ];

  const paymentMethods = [
    { name: 'Credit/Debit Cards', icon: '💳' },
    { name: 'PayPal', icon: '🅿️' },
    { name: 'Crypto (BTC, ETH)', icon: '₿' },
    { name: 'Prepaid Credits', icon: '🎫' },
  ];

  const handleSubscribe = (planName: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to subscribe');
      setShowLoginModal(true);
      return;
    }
    toast.success(`Successfully subscribed to ${planName}! 🎉`);
  };

  const handleContactSupport = () => {
    toast.info('Opening support chat...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full potential of AIVA World with flexible pricing options
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-neon-purple to-neon-pink text-white border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card
                className={`glass-effect neon-border p-8 h-full flex flex-col ${
                  plan.popular ? 'shadow-neon-purple scale-105' : ''
                } hover:shadow-neon transition-all duration-300`}
              >
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                  >
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>

                <div className="flex-1 mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} hover:shadow-neon transition-all duration-300 text-lg py-6`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="glass-effect neon-border p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Accepted Payment Methods</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => toast.info(`${method.name} selected`)}
                >
                  <div className="text-4xl mb-3">{method.icon}</div>
                  <p className="text-sm font-medium">{method.name}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change my plan anytime?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What happens to my avatars if I cancel?',
                a: 'Your avatars are always yours. Free tier users can keep 1 avatar, others are archived.',
              },
              {
                q: 'Are there any hidden fees?',
                a: 'No hidden fees. What you see is what you pay. Cancel anytime without penalties.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 7-day money-back guarantee for all paid plans, no questions asked.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect neon-border p-6 h-full hover:shadow-neon-cyan transition-all cursor-pointer">
                  <h3 className="font-bold mb-3 text-neon-cyan">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="glass-effect neon-border p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you choose the perfect plan
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon"
              onClick={handleContactSupport}
            >
              Contact Support
            </Button>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}