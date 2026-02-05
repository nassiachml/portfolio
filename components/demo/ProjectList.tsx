"use client";

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Check } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Project {
  id: string;
  name: string;
  status: "active" | "pending" | "completed";
  tasks: Task[];
  progress: number;
}

interface ProjectListProps {
  viewPreference: "list" | "kanban";
  darkMode: boolean;
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Refonte site web client A",
    status: "active",
    progress: 65,
    tasks: [
      { id: "t1", title: "Design des maquettes", completed: true },
      { id: "t2", title: "Développement front-end", completed: true },
      { id: "t3", title: "Intégration API", completed: false },
      { id: "t4", title: "Tests et corrections", completed: false },
    ],
  },
  {
    id: "2",
    name: "Création identité visuelle",
    status: "pending",
    progress: 20,
    tasks: [
      { id: "t5", title: "Moodboard", completed: true },
      { id: "t6", title: "Création logo", completed: false },
      { id: "t7", title: "Palette de couleurs", completed: false },
    ],
  },
  {
    id: "3",
    name: "Application mobile",
    status: "completed",
    progress: 100,
    tasks: [
      { id: "t8", title: "Conception UX", completed: true },
      { id: "t9", title: "Développement", completed: true },
      { id: "t10", title: "Publication", completed: true },
    ],
  },
];

export default function ProjectList({ viewPreference, darkMode }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleTask = (projectId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          const completedCount = updatedTasks.filter((t) => t.completed).length;
          const progress = Math.round((completedCount / updatedTasks.length) * 100);
          return { ...project, tasks: updatedTasks, progress };
        }
        return project;
      })
    );
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "active") return project.status === "active";
    if (filter === "completed") return project.status === "completed";
    return true;
  });

  const statusColors = {
    active: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusIcons = {
    active: Clock,
    pending: Circle,
    completed: CheckCircle2,
  };

  if (viewPreference === "kanban") {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {["active", "pending", "completed"].map((status) => {
          const StatusIcon = statusIcons[status as keyof typeof statusIcons];
          const statusProjects = projects.filter((p) => p.status === status);
          
          return (
            <div key={status} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <StatusIcon className={`w-5 h-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
                <h3 className={`font-bold capitalize ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {status === "active" ? "En cours" : status === "pending" ? "En attente" : "Terminés"}
                </h3>
                <span className={`ml-auto text-sm px-2 py-1 rounded-full ${darkMode ? "text-gray-300 bg-gray-700" : "text-gray-500 bg-gray-100"}`}>
                  {statusProjects.length}
                </span>
              </div>
              {statusProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 border shadow-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
                >
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{project.name}</h4>
                  <div className={`w-full h-2 rounded-full mb-3 ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      className="h-full bg-blue-600 rounded-full"
                    />
                  </div>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{project.progress}% complété</p>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "Tous" },
          { id: "active", label: "En cours" },
          { id: "completed", label: "Terminés" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === f.id
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => {
          const StatusIcon = statusIcons[project.status];
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-6 border shadow-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <StatusIcon className={`w-5 h-5 ${statusColors[project.status].split(" ")[1]}`} />
                  <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{project.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
                  {project.status === "active" ? "En cours" : project.status === "pending" ? "En attente" : "Terminé"}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Progression</span>
                  <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{project.progress}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className={`text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Tâches :</p>
                {project.tasks.map((task) => (
                  <motion.button
                    key={task.id}
                    whileHover={{ x: 4 }}
                    onClick={() => toggleTask(project.id, task.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                      darkMode ? "hover:bg-gray-600" : "hover:bg-gray-50"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <Circle className={darkMode ? "text-gray-500" : "text-gray-300"} size={20} />
                    )}
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? darkMode
                            ? "line-through text-gray-500"
                            : "line-through text-gray-400"
                          : darkMode
                          ? "text-gray-300"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.completed && <Check className="text-green-500" size={16} />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className={`mt-6 p-4 rounded-xl ${darkMode ? "bg-blue-900/30 border-blue-700" : "bg-blue-50 border-blue-200"} border`}>
        <p className={`text-sm text-center ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
          💡 <strong>Démo fictive</strong> – Les modifications ne sont pas enregistrées
        </p>
      </div>
    </div>
  );
}
