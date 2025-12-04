import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView?: 'board' | 'list';
  onViewChange?: (view: 'board' | 'list') => void;
}

export function DashboardLayout({ children, currentView, onViewChange }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-slate-950 overflow-hidden font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 supports-[height:100dvh]:h-[100dvh]">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav currentView={currentView} onViewChange={onViewChange} />
        <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 scrollbar-hide w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
