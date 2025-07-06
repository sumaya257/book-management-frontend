import { Mail, Code, Copyright } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-6 border-t border-zinc-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm space-y-4 md:space-y-0">
        
        {/* Left: Site info */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Copyright size={16} className="text-zinc-400" />
          <span>{new Date().getFullYear()} MyLibrary. All rights reserved.</span>
        </div>

        {/* Center: Contact info */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Mail size={16} className="text-zinc-400" />
          <a 
            href="mailto:support@mylibrary.com" 
            className="underline hover:text-white transition-colors duration-300"
          >
            support@mylibrary.com
          </a>
        </div>

        {/* Right: Credits */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Code size={16} className="text-zinc-400" />
          <span>Designed &amp; developed by <strong>Sumaya</strong></span>
        </div>

      </div>
    </footer>
  );
}
