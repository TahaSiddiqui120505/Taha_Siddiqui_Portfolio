import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const education = [
    {
      institution: "Rizvi College of Engineering, Mumbai",
      degree: "Bachelor of Engineering",
      field: "Artificial Intelligence & Data Science",
      period: "2022 – Present",
      highlights: [
        "CGPA: 8.6 / 10",
        "Honors: Blockchain Technologies",
        "Relevant Coursework: DSA, DBMS, Web Development"
      ]
    }
  ];

  const milestones = [
    "Full Stack Developer Intern at HealthSync Digital, contributing to production-grade web applications",
    "Built and deployed end-to-end MERN stack projects with authentication, dashboards, and REST APIs",
    "Winner – UI / Animation Design Contest",
    "Completed React Front-End Developer certification (Coursera)",
    "Participant – AI in Education Hackathon, exploring AI-driven learning solutions"
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="education" className="section-padding bg-primary">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">BACKGROUND</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education & Learning
          </h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <motion.div
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Education
            </h3>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                  variants={itemVariants}
                >
                  <div className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"></div>

                  <h4 className="text-lg font-medium mb-1">
                    {edu.institution}
                  </h4>

                  <p className="text-muted mb-1">
                    {edu.degree} – {edu.field}
                  </p>

                  <p className="text-sm font-mono text-light opacity-70 mb-3">
                    {edu.period}
                  </p>

                  <ul className="space-y-2 text-sm text-muted">
                    {edu.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 opacity-60">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Continuous Learning – MOVED HERE */}
            <motion.div
              className="mt-10 p-4 border border-muted border-opacity-20 bg-secondary bg-opacity-30 max-w-xl"
              variants={itemVariants}
            >
              <h4 className="text-sm font-medium mb-2">
                Continuous Learning
              </h4>
              <p className="text-muted text-sm">
                Continuously strengthening my foundations in full stack development
                while actively exploring Generative AI, RAG pipelines, and LLM-based applications.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Learning & Impact
            </h3>

            <ul className="space-y-4">
              {milestones.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-light mt-1 mr-2 opacity-60">⁕</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
