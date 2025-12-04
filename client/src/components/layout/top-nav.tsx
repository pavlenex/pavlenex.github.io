import { Filter, ListFilter, Layers, Sun, Moon, Menu, List as ListIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Project } from "@/data/projects";

interface TopNavProps {
  currentView?: 'board' | 'list';
  onViewChange?: (view: 'board' | 'list') => void;
}

export function TopNav({ currentView, onViewChange }: TopNavProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
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
    <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-slate-200 dark:border-r-slate-800">
            <SidebarContent currentView={currentView} onViewChange={onViewChange} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-900 dark:text-slate-100">Just a PM working in Bitcoin</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
      </div>
    </header>
  );
}

interface BoardControlsProps {
  onFilterChange: (tag: string | null) => void;
  onSortChange: (sort: 'asc' | 'desc' | null) => void;
  activeFilter: string | null;
  activeSort: 'asc' | 'desc' | null;
  allTags: string[];
  currentView: 'board' | 'list';
  onViewChange: (view: 'board' | 'list') => void;
}

export function BoardControls({ onFilterChange, onSortChange, activeFilter, activeSort, allTags, currentView, onViewChange }: BoardControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 pb-0 bg-white dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Projects</h1>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className={`h-8 border-slate-200 dark:border-slate-700 ${activeFilter ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
              <Filter className="w-3.5 h-3.5 mr-2" />
              {activeFilter ? activeFilter : 'Filter'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Tag</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={activeFilter || "all"} onValueChange={(val) => onFilterChange(val === "all" ? null : val)}>
              <DropdownMenuRadioItem value="all">All Projects</DropdownMenuRadioItem>
              {allTags.map(tag => (
                <DropdownMenuRadioItem key={tag} value={tag}>{tag}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className={`h-8 border-slate-200 dark:border-slate-700 ${activeSort ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
              <ListFilter className="w-3.5 h-3.5 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort by Title</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={activeSort || "none"} onValueChange={(val) => onSortChange(val === "none" ? null : val as 'asc' | 'desc')}>
              <DropdownMenuRadioItem value="none">Default</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="asc">A-Z</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="desc">Z-A</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-4 mx-1 bg-slate-200 dark:bg-slate-700" />
        
        <Button 
          variant={currentView === 'list' ? "secondary" : "ghost"} 
          size="sm" 
          className={`h-8 px-2.5 ${currentView === 'list' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200' : 'text-slate-600 dark:text-slate-400'}`}
          onClick={() => onViewChange('list')}
          title="List View"
        >
          <ListIcon className="w-3.5 h-3.5" />
        </Button>

        <Button 
          variant={currentView === 'board' ? "secondary" : "ghost"} 
          size="sm" 
          className={`h-8 ${currentView === 'board' ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200' : 'text-slate-600 dark:text-slate-400'}`}
          onClick={() => onViewChange('board')}
        >
          <Layers className="w-3.5 h-3.5 mr-2" />
          Board
        </Button>
      </div>
    </div>
  );
}
