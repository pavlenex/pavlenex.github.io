import { 
  LayoutGrid, 
  Inbox,
  Users,
  BarChart3,
  Plus,
  Github,
  BookOpen,
  Mail,
  Sun,
  Moon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import photo from "@assets/pavlenex_1764795670362.jpg";
import { useState, useEffect } from "react";

const SignalIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface SidebarContentProps {
  currentView?: 'board' | 'list';
  onViewChange?: (view: 'board' | 'list') => void;
}

export function SidebarContent({ currentView, onViewChange }: SidebarContentProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-slate-200 dark:border-slate-700">
              <AvatarImage src={photo} />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Pavlenex</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Product Manager</span>
            </div>
          </div>
          
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              data-testid="button-theme-toggle"
            >
              {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 py-4">
        <div className="px-3 mb-2">
          <a href="mailto:pavlenex@icloud.com">
            <Button variant="secondary" className="w-full justify-start gap-2 text-slate-600 dark:text-slate-300 font-medium shadow-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700" data-testid="button-new-project">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </a>
        </div>

        <nav className="px-2 space-y-1 mt-6">
          <div className="px-3 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Favorites</div>
          <SidebarItem icon={Inbox} label="Inbox" count={4} />
          <SidebarItem 
            icon={LayoutGrid} 
            label="Views" 
            active={currentView === 'board' || currentView === 'list'}
            onClick={() => onViewChange?.(currentView === 'list' ? 'board' : 'list')}
          />
          <SidebarItem icon={BookOpen} label="Blog" />
        </nav>

        <nav className="px-2 space-y-1 mt-8">
          <div className="px-3 text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Your Teams</div>
          <SidebarItem icon={Users} label="Product" />
          <SidebarItem icon={BarChart3} label="Engineering" />
          <SidebarItem icon={LayoutGrid} label="Design" />
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-1">
          Product manager focused on Bitcoin open source. Nine years building payment and mining infrastructure used across the ecosystem.
        </div>

        <div className="flex justify-center gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
          <a href="https://signal.me/#eu/wAyIvLXgD3eJbV5qY9VR6Eco79NLQ1y2gIV9c6y9oy0z76HHl55GHrbl5F0w7bR9" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Signal" data-testid="link-signal">
            <SignalIcon className="w-4 h-4" />
          </a>
          <a href="https://github.com/pavlenex" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="GitHub" data-testid="link-github">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://x.com/pavlenex" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="X" data-testid="link-x">
            <XIcon className="w-4 h-4" />
          </a>
          <a href="mailto:pavlenex@icloud.com" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Email" data-testid="link-email">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps extends SidebarContentProps {}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-64 border-r border-slate-200 dark:border-slate-800 h-screen hidden md:block">
      <SidebarContent currentView={currentView} onViewChange={onViewChange} />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, count, active, onClick }: { icon: any, label: string, count?: number, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`
      flex items-center justify-between px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-colors
      ${active 
        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'}
    `}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-500'}`} />
        <span>{label}</span>
      </div>
      {count && (
        <span className="text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">{count}</span>
      )}
    </div>
  );
}
