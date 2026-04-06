"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Mail,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Layers,
  Cpu,
  Lightbulb
} from "lucide-react";
import Image from "next/image";

// Brand SVGs as constants
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="bg-navy overflow-hidden">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[2000]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center w-full">
          <motion.a
            href="#home"
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Tanvi Khatu
          </motion.a>

          <ul className="nav-links hidden md:flex">
            {["about", "projects", "skills", "contact"].map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <a
                  href={`#${item}`}
                  className={activeSection === item ? "text-gold" : ""}
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>

          <button
            className="hamburger md:hidden block"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="text-gold" /> : <Menu className="text-gold" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu glass flex md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {["about", "projects", "skills", "contact"].map((item) => (
              <a key={item} href={`#${item}`} onClick={closeMenu}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center pt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-eyebrow">Tanvi Khatu — Computer Engineering</span>
            <h1 className="text-gradient">
              Crafting <em>Digital</em>
              <span>Excellence with Code</span>
            </h1>
            <p className="hero-desc">
              Passionate Computer Engineering student specialzing in Java development and creative software architecture.
              Bridging the gap between artistic design and robust engineering.
            </p>

            <div className="hero-btns">
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View My Work <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num text-gradient">3</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-num text-gradient">VIT</span>
                <span className="stat-label">Engineering</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="avatar-container">
              <div className="avatar-bg" />
              <div className="hero-avatar">
                <Image
                  src="/pic.jpeg"
                  alt="Tanvi Khatu"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about">
        <motion.div
          className="section-header"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="section-tag">01 / Concept</span>
          <h2 className="section-title">
            The Journey <span className="divider"></span>
          </h2>
        </motion.div>

        <motion.div
          className="about-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            { icon: <Cpu />, title: "Who I am", text: "I am a dedicated Computer Science student with a passion for technology and programming. I enjoy learning new skills and building projects using concepts like Java and object-oriented programming. I am always eager to grow, improve, and work towards a successful career in the tech field." },
            { icon: <Lightbulb />, title: "What drives me", text: "I'm a quick learner and creative explorer. My mission is to build software that scales and makes a genuine impact." },
            { icon: <BookOpen />, title: "Education", text: "Pursuing B.Tech at Vidyalankar Institute of Technology. Mastering Web Development, data structures, algorithms, and modular design." },
            { icon: <Layers />, title: "Beyond code", text: "Artist at heart. Drawing sharpens my eye for UI/UX, ensuring my code is as beautiful as it is functional." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="about-block"
              variants={fadeInUp}
            >
              <h3><span className="text-gold">{item.icon}</span> {item.title}</h3>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects">
        <motion.div
          className="section-header"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="section-tag">02 / Portfolio</span>
          <h2 className="section-title">
            Selected Works <span className="divider"></span>
          </h2>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: "🎬",
              tag: "Java / OOP",
              title: "Ticket System",
              desc: "Engineered a sophisticated Movie Ticket Booking System using Java OOP principles. Features high-scale seat selection and user state management.",
              tech: ["Java", "OOP", "Collections"]
            },
            {
              icon: "📚",
              tag: "Java / File IO",
              title: "Library Engine",
              desc: "Built a robust Management System for digitalized library resources. Implemented intricate file handling and search algorithms.",
              tech: ["Java", "File IO", "Logic"]
            },
            {
              icon: "🌐",
              tag: "Web / Frontend",
              title: "Visual Web",
              desc: "Deep dive into web semantics and modern layouting. crafting pixel-perfect interfaces with advanced CSS architecture.",
              tech: ["Next.js", "Tailwind", "Motion"]
            }
          ].map((proj, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              <div className="project-image-placeholder">
                <span className="project-icon-large">{proj.icon}</span>
              </div>
              <div className="project-body">
                <span className="project-tag">{proj.tag}</span>
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <div className="tech-stack">
                  {proj.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="w-full">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <motion.div
            className="section-header"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="section-tag">03 / Tech Stack</span>
            <h2 className="section-title">
              Core Expertise <span className="divider"></span>
            </h2>
          </motion.div>

          <div className="skills-grid">
            {[
              {
                cat: "Languages",
                skills: [["Java", 88], ["Python", 75], ["C", 70]]
              },
              {
                cat: "Web Tech",
                skills: [["HTML", 82], ["CSS", 76], ["Next.js", 65]]
              },
              {
                cat: "Foundations",
                skills: [["OOP", 88], ["Algorithms", 85], ["Data Structure", 72]]
              },
              {
                cat: "Metaskills",
                skills: [["Learning", 95], ["Creative", 90], ["Agile", 85]]
              }
            ].map((category, idx) => (
              <motion.div
                key={idx}
                className="skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="skill-cat-title">{category.cat}</div>
                {category.skills.map(([name, pct]) => (
                  <div key={name as string} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{name}</span>
                      <span className="skill-pct">{pct}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <div className="contact-container">
          <motion.div
            className="contact-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">04 / Availability</span>
            <h3>Let&apos;s Orchestrate <br /> Something New.</h3>
            <p>
              I am actively seeking engineering internships and collaborative
              open-source cycles. Drop a message to connect.
            </p>

            <div className="contact-links">
              {[
                { icon: <Mail />, label: "Email", val: "tanvikhatu05@gmail.com", link: "mailto:tanvikhatu05@gmail.com" },
                { icon: <GithubIcon />, label: "Github", val: "https://github.com/TanviKhatu", link: "https://github.com/TanviKhatu" },
                { icon: <LinkedinIcon />, label: "Linkedin", val: "https://www.linkedin.com/in/tanvi-khatu-060640315/", link: "https://www.linkedin.com/in/tanvi-khatu-060640315/" }
              ].map((link, idx) => (
                <a key={idx} href={link.link} className="contact-link" target="_blank" rel="noopener noreferrer">
                  <div className="link-icon-wrap">{link.icon}</div>
                  <div className="link-details">
                    <span>{link.label}</span>
                    <strong>{link.val}</strong>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {formStatus === "success" ? (
              <motion.div
                className="form-success-msg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle2 className="success-icon" />
                <h4 className="text-2xl font-serif text-white">Transmission Sent</h4>
                <p className="text-secondary">Your message has been encoded and dispatched. I will respond within 24 hours.</p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="btn-outline mt-4"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="Jane Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Digital Address</label>
                  <input type="email" className="form-input" placeholder="jane@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Objective / Message</label>
                  <textarea className="form-textarea" rows={5} placeholder="How can we assist each other?" required />
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? "Processing..." : "Dispatch Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">TK</div>
        <p>© 2026 Tanvi Khatu. Built with high-spec Next.js & Passion.</p>
      </footer>
    </div>
  );
}
