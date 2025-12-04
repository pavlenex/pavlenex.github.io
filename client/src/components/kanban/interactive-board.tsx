import type { Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InteractiveKanbanProps {
  projects: Project[];
}

export function InteractiveKanban({ projects }: InteractiveKanbanProps) {
  const currentProjects = projects.filter(p => p.status === 'current');
  const inProgressProjects = projects.filter(p => p.status === 'in-progress');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="p-4 md:p-6 h-auto md:h-full bg-white dark:bg-slate-950">
      {/* Mobile: Stacked (flex-col), Desktop: Grid (3 cols) */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 h-auto md:h-full">
        {/* Column 1: Current */}
        <KanbanColumn 
          title="Current" 
          count={currentProjects.length} 
          color="bg-blue-500"
          projects={currentProjects}
        />

        {/* Column 2: In Progress */}
        <KanbanColumn 
          title="In Progress" 
          count={inProgressProjects.length} 
          color="bg-orange-500"
          projects={inProgressProjects}
        />

        {/* Column 3: Completed */}
        <KanbanColumn 
          title="Completed" 
          count={completedProjects.length} 
          color="bg-green-500"
          projects={completedProjects}
        />
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, color, projects }: { title: string, count: number, color: string, projects: Project[] }) {
  return (
    <div className="flex flex-col h-auto md:h-full min-w-0 shrink-0">
      <div className="flex items-center justify-between mb-3 px-1 sticky top-0 bg-white dark:bg-slate-950 z-10 py-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`}></div>
          <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200">{title}</h3>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 ml-1">{count}</span>
        </div>
        <div className="flex gap-1">
           <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
             <Plus className="w-3.5 h-3.5" />
           </Button>
        </div>
      </div>
      
      {/* 
         Mobile: Auto height, no internal scroll (page scrolls).
         Desktop: Flex-1 (takes available space), internal scroll.
      */}
      <div className="md:flex-1 bg-slate-50/50 dark:bg-slate-900/30 rounded-xl p-2 space-y-3 border border-slate-100/50 dark:border-slate-800/50 md:overflow-y-auto scrollbar-hide min-h-[100px]">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        
        <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 text-sm h-9 px-2">
          <Plus className="w-3.5 h-3.5 mr-2" />
          New
        </Button>
      </div>
    </div>
  );
}
