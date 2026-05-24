import { useState } from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "HealthSync – Healthcare Company Website & Admin System",
      description:
        "A production-grade full stack web platform developed during my internship at HealthSync Digital. The system includes a public-facing healthcare website and a secure admin dashboard that allows non-technical staff to manage blogs, content, and media. The project focused on clean architecture, secure authentication, and real-world usability, ensuring scalability and maintainability in a professional environment.",
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
        "GSAP"
      ],
      liveLink: "",
      highlights: [
        "Built complete public website and admin dashboard",
        "JWT-based authentication for secure admin access",
        "Dynamic blog CRUD system with image uploads",
        "Designed for non-technical content management",
        "Production-focused architecture and clean UI"
      ]
    },
    {
      title: "EduSaver – Student Book Resale Platform",
      description:
        "An end-to-end MERN stack marketplace designed to help students buy and sell academic books efficiently. EduSaver supports secure user authentication, role-based access for buyers and sellers, and optimized database design for handling listings and transactions. The project demonstrates full ownership of backend APIs, database schema design, and frontend user experience.",
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
        "REST APIs"
      ],
      liveLink: "",
      highlights: [
        "Peer-to-peer marketplace for academic books",
        "Secure login and role-based access control",
        "Scalable REST APIs for users, listings, and orders",
        "Optimized MongoDB schema for efficient queries",
        "Built with real-world transaction workflows in mind"
      ]
    },
    {
      title: "Campus Food Delivery Platform",
      description:
        "A full stack food delivery application developed as an extended learning project, inspired by a guided tutorial but significantly redesigned and expanded. The platform models real-world food ordering workflows, including user authentication, restaurant management, order lifecycle handling, and secure backend APIs. The focus was on understanding system design, data flow, and edge cases in a multi-role application.",
      tech: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication"
      ],
      liveLink: "",
      highlights: [
        "Multi-role system for users, vendors, and admin",
        "Complete order lifecycle management",
        "Secure authentication and authorization flows",
        "Custom data models beyond tutorial structure",
        "Focused on backend logic and system design"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="section-padding bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">PORTFOLIO</h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Selected Projects
          </h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Project Selector */}
          <motion.div
            className="md:col-span-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`border-l border-muted p-4 cursor-pointer transition-all duration-300 ${
                  activeProject === index
                    ? "border-opacity-100 bg-secondary bg-opacity-30"
                    : "border-opacity-20"
                }`}
                onClick={() => setActiveProject(index)}
                whileHover={{
                  backgroundColor: "rgba(26, 26, 26, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3
                  className={`font-medium text-sm mb-1 ${
                    activeProject === index ? "text-light" : "text-muted"
                  }`}
                >
                  {project.title}
                </h3>
                <p className="text-xs text-muted line-clamp-1">
                  {project.tech.slice(0, 3).join(", ")}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="md:col-span-8"
            key={activeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-secondary bg-opacity-20 p-4 md:p-6 border border-muted border-opacity-10"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                {projects[activeProject].title}
              </h3>

              <p className="text-sm md:text-base text-muted mb-6 leading-relaxed">
                {projects[activeProject].description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs md:text-sm font-mono text-light mb-3">
                  KEY HIGHLIGHTS
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {projects[activeProject].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-light opacity-50 mt-1">→</span>
                      <span className="text-xs md:text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs md:text-sm font-mono text-light mb-3">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {projects[activeProject].tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs py-1 px-3 bg-primary border border-muted border-opacity-20 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
