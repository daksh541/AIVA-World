import { Shield, FileText, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">AIVA World</h3>
            <p className="text-muted-foreground text-sm">
              Artificially Intelligent Virtual Avatars - Your imagination, brought to life.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neon-blue">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon-blue transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neon-purple">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-neon-purple transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neon-pink">Compliance</h4>
            <p className="text-sm text-muted-foreground">
              GDPR & CCPA Compliant
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              End-to-End Encrypted
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AIVA World. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-red-400 font-semibold">18+ Only</span>
              <span className="text-muted-foreground">- Age verification required</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}