import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ListViewProps {
  projects: Project[];
}

export function ListView({ projects }: ListViewProps) {
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header - Hidden on very small screens if needed, or adjust cols */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <div className="col-span-8 md:col-span-5">Project</div>
          <div className="col-span-4 md:col-span-2 text-right md:text-left">Status</div>
          <div className="col-span-3 md:col-span-4 hidden md:block">Tags</div>
          <div className="col-span-0 md:col-span-1 text-right hidden md:block">Link</div>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
            >
              <div className="col-span-8 md:col-span-5">
                <h3 className="font-medium text-slate-900 dark:text-slate-100">{project.title}</h3>
                {project.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">{project.description}</p>
                )}
                {/* Mobile only tags */}
                <div className="flex md:hidden flex-wrap gap-1.5 mt-2">
                   {project.tags.slice(0, 2).map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-[10px] px-1.5 py-0 h-5 font-normal border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="col-span-4 md:col-span-2 flex justify-end md:justify-start">
                <StatusBadge status={project.status} />
              </div>
              
              <div className="col-span-3 md:col-span-4 hidden md:flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs font-normal border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="col-span-0 md:col-span-1 text-right hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    'current': 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    'in-progress': 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    'completed': 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
  };

  const labels = {
    'current': 'Current',
    'in-progress': 'In Progress',
    'completed': 'Completed',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${styles[status as keyof typeof styles]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}
