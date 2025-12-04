import type { Project } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

// Helper to deterministically pick colors based on tag name
const getTagColor = (tag: string) => {
  const colors = [
    "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-800/60 border-blue-200 dark:border-blue-800",
    "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:hover:bg-purple-800/60 border-purple-200 dark:border-purple-800",
    "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300 dark:hover:bg-green-800/60 border-green-200 dark:border-green-800",
    "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:hover:bg-orange-800/60 border-orange-200 dark:border-orange-800",
    "bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/40 dark:text-pink-300 dark:hover:bg-pink-800/60 border-pink-200 dark:border-pink-800",
    "bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/40 dark:text-teal-300 dark:hover:bg-teal-800/60 border-teal-200 dark:border-teal-800",
  ];
  
  // Simple hash to pick a color
  const hash = tag.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full group/card"
    >
      <Card 
        className={`
          border-none shadow-sm hover:shadow-md transition-all duration-200 
          bg-white dark:bg-slate-900/60 
          cursor-pointer overflow-hidden relative
          ${isExpanded ? 'ring-1 ring-slate-200 dark:ring-slate-700' : ''}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0 space-y-3">
              <h3 className="font-semibold text-base text-slate-800 dark:text-slate-100 leading-none">
                {project.title}
              </h3>
              
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className={`px-2 py-0.5 text-[11px] font-medium border ${getTagColor(tag)} rounded-md`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-1 shrink-0 -mt-1 -mr-1">
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && project.description && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {project.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
