import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMoon,
  FiSun,
  FiX,
} from "react-icons/fi";
import { profile, projects, skills } from "./data";
import cv from "./files/NguyenTienPhat_Fresher_Fullstack_Developer.pdf";
import "./styles.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("modal-open", Boolean(activeProject));
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nguyen Tien Phat home">
          <span className="brand-mark">NP</span>
          <span>{profile.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="topbar-actions">
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
          <button
            className="icon-button"
            type="button"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            title={dark ? "Light theme" : "Dark theme"}
          >
            {dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero section" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-copy">
              <p className="status"><span className="status-dot" /> Available for opportunities</p>
              <p className="eyebrow">Full-stack developer · Ho Chi Minh City</p>
              <h1 id="hero-title">
                Building useful products with <span>clear code.</span>
              </h1>
              <p className="hero-lead">{profile.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">View my work <FiArrowDown /></a>
                <a className="button button-secondary" href={`mailto:${profile.email}`}>Let's talk <FiMail /></a>
              </div>
              <div className="hero-proof" aria-label="Portfolio highlights">
                <div><strong>3</strong><span>Selected projects</span></div>
                <div><strong>Full-stack</strong><span>Frontend + backend</span></div>
                <div><strong>2024</strong><span>Latest project work</span></div>
              </div>
            </motion.div>

            <motion.aside
              className="hero-card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              aria-label="Quick profile"
            >
              <div className="portrait-wrap">
                <img src="/avatar.jpg" alt="Nguyen Tien Phat" className="portrait" onError={(event) => { event.currentTarget.style.display = "none"; }} />
                <span className="portrait-fallback">NP</span>
              </div>
              <div className="hero-card-body">
                <p className="card-label">Currently focused on</p>
                <h2>Web applications that are simple to use and easy to maintain.</h2>
                <div className="tag-list">
                  {skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </motion.aside>
          </div>
          <a className="scroll-cue" href="#work">Scroll to explore <FiArrowDown /></a>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <SectionHeading
            eyebrow="01 / Selected work"
            title="Projects with real problems behind them."
            text="A small set of projects that show how I approach product work, frontend development and backend systems."
          />

          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article
                className={`project-card project-card-${index + 1}`}
                key={project.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                <div className="project-image-wrap">
                  <img src={project.image} alt={`${project.title} project preview`} className="project-image" />
                  <span className="project-number">0{index + 1}</span>
                </div>
                <div className="project-body">
                  <div className="project-meta"><span>{project.year}</span><span>{project.tag}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-footer">
                    <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <button className="arrow-button" type="button" onClick={() => setActiveProject(project)} aria-label={`Read case study for ${project.title}`}>
                      <FiArrowUpRight aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-grid">
            <SectionHeading eyebrow="02 / About" title="I care about useful work, not just more code." />
            <div className="about-copy">
              <p id="about-title">I am a full-stack developer based in Ho Chi Minh City. I enjoy turning ideas into practical web applications and learning how each part of a product works together.</p>
              <p>My strongest experience comes from building projects with React, Node.js, Express, MongoDB and MySQL. I like simple architecture, clear interfaces and solutions that are easy to explain.</p>
              <div className="principles">
                <div><span>01</span><strong>Understand first</strong><p>I start with the problem and the people using the product.</p></div>
                <div><span>02</span><strong>Keep it clear</strong><p>I prefer small, understandable solutions over unnecessary complexity.</p></div>
                <div><span>03</span><strong>Keep improving</strong><p>I test, review and improve the work instead of treating the first version as final.</p></div>
              </div>
            </div>
          </div>

          <div className="experience-grid">
            <div>
              <p className="eyebrow">Experience</p>
              <div className="timeline-item">
                <div><strong>Software Engineering Intern</strong><span>04 — 06 / 2024</span></div>
                <p>MiuTech Company · Worked on real-world web development tasks and applied full-stack skills in a team environment.</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Education</p>
              <div className="timeline-item">
                <div><strong>Software Engineering</strong><span>2019 — 2024</span></div>
                <p>Ton Duc Thang University · Built a strong foundation through software projects and practical development work.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" aria-labelledby="skills-title">
          <div className="skills-header"><div><p className="eyebrow">03 / Tools</p><h2 id="skills-title">Tools I work with.</h2></div><p>I choose tools based on the problem, project size and long-term simplicity.</p></div>
          <div className="skills-grid">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div>
              <p className="eyebrow">04 / Contact</p>
              <h2 id="contact-title">Have a project in mind?</h2>
              <p>Tell me what you are building, what you need help with, or simply say hello.</p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}>Email me <FiMail /></a>
              <button className="button button-secondary" type="button" onClick={copyEmail}>
                {copied ? <FiCheck /> : <FiCopy />} {copied ? "Copied" : "Copy email"}
              </button>
            </div>
            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a>
              <a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub <FiArrowUpRight /></a>
              <a href={cv} target="_blank" rel="noreferrer"><FiArrowUpRight /> View CV</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Nguyen Tien Phat</span>
        <span>Built with React + Vite</span>
        <a href="#top" aria-label="Back to top"><FiArrowUp /></a>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveProject(null)}>
            <motion.div className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={(event) => event.stopPropagation()}>
              <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close case study"><FiX /></button>
              <img src={activeProject.image} alt="" className="case-image" />
              <div className="case-content">
                <div className="project-meta"><span>{activeProject.year}</span><span>{activeProject.tag}</span></div>
                <h2 id="case-title">{activeProject.title}</h2>
                <p className="case-summary">{activeProject.summary}</p>
                <div className="case-columns">
                  <div><p className="eyebrow">The problem</p><p>{activeProject.problem}</p></div>
                  <div><p className="eyebrow">My role</p><p>{activeProject.role}</p></div>
                  <div><p className="eyebrow">What I built</p><p>{activeProject.solution}</p></div>
                </div>
                <div className="case-decision"><p className="eyebrow">Key decisions</p><ul>{activeProject.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></div>
                <div className="case-actions"><a className="button button-primary" href={activeProject.demo} target="_blank" rel="noreferrer">Live demo <FiArrowUpRight /></a><a className="button button-secondary" href={activeProject.github} target="_blank" rel="noreferrer"><FiGithub /> Source code</a></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
