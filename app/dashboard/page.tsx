"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FolderOpen,
  Code2,
  Calendar,
  Rocket,
  BarChart3,
  Layers,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import SkillBar from "@/components/dashboard/SkillBar";
import ChartProjects from "@/components/dashboard/ChartProjects";
import ChartStack from "@/components/dashboard/ChartStack";
import {
  stats,
  projectTypes,
  stackDistribution,
  topTechnologies,
  featuredProjects,
} from "@/data/dashboard-data";

export default function DashboardPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-dark-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">Dashboard Personnel</span>
          </h1>
          <p className="text-lg text-gray-400">
            Vue d'ensemble de mon profil de développeuse Fullstack Junior
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={FolderOpen}
            label="Projets réalisés"
            value={stats.projects}
            suffix="+"
            delay={0}
            color="#3b82f6"
          />
          <StatCard
            icon={Code2}
            label="Technologies maîtrisées"
            value={stats.technologies}
            suffix="+"
            delay={1}
            color="#8b5cf6"
          />
          <StatCard
            icon={Calendar}
            label="Années d'expérience"
            value={stats.experience}
            suffix=" ans"
            delay={2}
            color="#ec4899"
          />
          <StatCard
            icon={Rocket}
            label="Projets actifs"
            value={stats.activeProjects}
            delay={3}
            color="#22c55e"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <FolderOpen className="text-bordeaux-400" size={20} />
                <h2 className="text-xl font-bold">Projets récents</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    type={project.type}
                    stack={project.stack}
                    badge={project.badge as "Fictif" | "Réel"}
                    link={project.link}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Graphique Répartition Projets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="text-purple-400" size={20} />
              <h2 className="text-xl font-bold">Répartition des projets</h2>
            </div>
            <ChartProjects data={projectTypes} />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Compétences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="text-cyan-400" size={20} />
              <h2 className="text-xl font-bold">Technologies maîtrisées</h2>
            </div>
            <div>
              {topTechnologies.map((tech, index) => (
                <SkillBar
                  key={tech.name}
                  name={tech.name}
                  percentage={tech.percentage}
                  color={tech.color}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Stack Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Layers className="text-emerald-400" size={20} />
              <h2 className="text-xl font-bold">Stack utilisée</h2>
            </div>
            <ChartStack data={stackDistribution} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
