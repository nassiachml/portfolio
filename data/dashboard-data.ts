// Données extraites du portfolio (alignées sur components/Portfolio.tsx)
export const stats = {
  projects: 34,
  technologies: 15,
  experience: 3,
  activeProjects: 8,
};

export const projectTypes = [
  { name: "Développement", count: 20, color: "#3b82f6" },
  { name: "Graphisme", count: 4, color: "#8b5cf6" },
  { name: "Communication", count: 4, color: "#f97316" },
  { name: "WebTV & Loisirs", count: 2, color: "#22c55e" },
  { name: "Audiovisuel", count: 4, color: "#ec4899" },
];

export const stackDistribution = [
  { name: "Front-end", percentage: 45, color: "#3b82f6" },
  { name: "Back-end", percentage: 25, color: "#8b5cf6" },
  { name: "UI/UX", percentage: 20, color: "#ec4899" },
  { name: "Audiovisuel", percentage: 10, color: "#22c55e" },
];

export const topTechnologies = [
  { name: "Next.js", percentage: 90, color: "#000000" },
  { name: "React", percentage: 90, color: "#61dafb" },
  { name: "TypeScript", percentage: 85, color: "#3178c6" },
  { name: "Symfony", percentage: 75, color: "#000000" },
  { name: "WordPress", percentage: 80, color: "#21759b" },
  { name: "PHP", percentage: 75, color: "#777bb4" },
  { name: "Tailwind CSS", percentage: 85, color: "#06b6d4" },
  { name: "Framer Motion", percentage: 80, color: "#0055ff" },
];

// Projets à la une (sélection diversifiée du portfolio)
export const featuredProjects = [
  {
    id: 25,
    title: "Mini Dashboard Personnel",
    type: "Développement",
    stack: ["Next.js", "React", "TypeScript", "Framer Motion"],
    badge: "Fictif",
    link: "/dashboard",
  },
  {
    id: 34,
    title: "FitTrack - Application Bien-être / Fitness",
    type: "Développement",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    badge: "Fictif",
    link: "/fitness",
  },
  {
    id: 27,
    title: "URBANA Studio - Identité Visuelle",
    type: "Graphisme",
    stack: ["Branding", "Logo Design", "Direction Artistique"],
    badge: "Fictif",
    link: "/portfolio/urbana-branding",
  },
  {
    id: 29,
    title: "Landing Page Marketing - Flowly",
    type: "Développement",
    stack: ["Next.js", "React", "TypeScript", "Marketing"],
    badge: "Fictif",
    link: "/landing-flowly",
  },
  {
    id: 30,
    title: "Campagne 360° - Silence",
    type: "Communication",
    stack: ["Communication", "Direction Artistique", "Storytelling"],
    badge: "Fictif",
    link: "/portfolio/silence-campaign",
  },
  {
    id: 33,
    title: "Visual Soundscape - Animation Interactive",
    type: "Audiovisuel",
    stack: ["Canvas API", "React", "TypeScript", "WebGL"],
    badge: "Fictif",
    link: "/visual-soundscape",
  },
];
