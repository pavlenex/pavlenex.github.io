import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { BoardControls } from "@/components/layout/top-nav";
import { InteractiveKanban } from "@/components/kanban/interactive-board";
import { ListView } from "@/components/kanban/list-view";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { projects, type Project } from "@/data/projects";

export default function Dashboard() {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [currentView, setCurrentView] = useState<'board' | 'list'>('board');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (filterTag) {
      result = result.filter(p => p.tags.includes(filterTag));
    }

    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
    }

    return result;
  }, [filterTag, sortOrder]);

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col h-full bg-white dark:bg-slate-950"
      >
        <BoardControls 
          onFilterChange={setFilterTag}
          onSortChange={setSortOrder}
          activeFilter={filterTag}
          activeSort={sortOrder}
          allTags={allTags}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <div className="flex-1 overflow-hidden mt-2">
          {currentView === 'board' ? (
            <InteractiveKanban projects={filteredProjects} />
          ) : (
            <div className="h-full overflow-y-auto">
              <ListView projects={filteredProjects} />
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
