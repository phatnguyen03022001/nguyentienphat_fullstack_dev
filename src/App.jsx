import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin, FiMail, FiMoon, FiSun, FiArrowUp } from "react-icons/fi";
import { education, experience, principles, profile, projects, skills } from "./data";
import { SectionHeading } from "./components/SectionHeading";
import { ProjectCard } from "./components/ProjectCard";
import { CaseStudyModal } from "./components/CaseStudyModal";
import cv from "./files/NguyenTienPhat_Fresher_Fullstack_Developer.pdf";
import avatar from "./images/avatar/avt.jpg";
import "./styles.css";
import "./accessibility.css";

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);
  const modalCloseRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduceMotion(event.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!activeProject) {
      document.body.classList.remove("modal-open");
      return undefined;
    }

    document.body.classList.add("modal-open");
    modalCloseRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeProject();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector("[data-case-dialog]");
      if (!dialog) return;
      const focusable = dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  const openProject = (project, event) => {
    lastFocusedRef.current = event.currentTarget;
    setActiveProject(project);
  };

  const closeProject = () => {
    setActiveProject(null);
    window.setTimeout(() => lastFocusedRef.current?.focus(), 0);
  };

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
    <div className={`site-shell${reduceMotion ? " reduce-motion" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nguyen Tien Phat home"><span className="brand-mark">NP</span><span>{profile.name}</span></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
        <div className="topbar-actions">
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>
          <button className="icon-button" type="button" onClick={() => setDark((value) => !value)} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Light theme" : "Dark theme"}>{dark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}</button>
        </div>
      </header>

      <main id="main" tabIndex="-1">
        <section className="hero section" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy reveal-up">
              <p className="status"><span className="status-dot" aria-hidden="true" /> Available for opportunities</p>
              <p className="eyebrow">{profile.role} · {profile.location}</p>
              <h1 id="hero-title">Building useful products with <span>clear code.</span></h1>
              <p className="hero-lead">{profile.intro}</p>
              <div className="hero-actions"><a className="button button-primary" href="#work">View my work <FiArrowDown aria-hidden="true" /></a><a className="button button-secondary" href={`mailto:${profile.email}`}>Let's talk <FiMail aria-hidden="true" /></a></div>
              <div className="hero-proof" aria-label="Portfolio highlights"><div><strong>{projects.length}</strong><span>Selected projects</span></div><div><strong>Full-stack</strong><span>Frontend + backend</span></div><div><strong>Graduated</strong><span>Software Engineering · TDTU</span></div></div>
            </div>
            <div className="hero-card reveal-scale" aria-label="Quick profile">
              <div className="portrait-wrap"><img src={avatar} alt={profile.name} className="portrait" loading="eager" fetchPriority="high" decoding="async" /></div>
              <div className="hero-card-body"><p className="card-label">Currently focused on</p><h2>{profile.currentFocus}</h2><div className="tag-list">{skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}</div></div>
            </div>
          </div>
          <a className="scroll-cue" href="#work">Scroll to explore <FiArrowDown aria-hidden="true" /></a>
        </section>

        <section className="section work-section" id="work" aria-labelledby="work-title">
          <SectionHeading eyebrow="01 / Selected work" title="Projects with real problems behind them." text="A small set of projects that show how I approach product work, frontend development and backend systems." titleId="work-title" />
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} reduceMotion={reduceMotion} onOpen={(event) => openProject(project, event)} />)}</div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="about-grid">
            <SectionHeading eyebrow="02 / About" title="I care about useful work, not just more code." titleId="about-title" />
            <div className="about-copy">
              <p>I am a full-stack developer based in Ho Chi Minh City. I enjoy turning ideas into practical web applications and understanding how each part of a product works together.</p>
              <p>My project work covers React, Node.js, Express, MongoDB, MySQL and real-time communication with Socket.io. I prefer clear interfaces, small abstractions and solutions that are easy to explain.</p>
              <div className="principles">{principles.map((principle, index) => <div key={principle.title}><span>0{index + 1}</span><strong>{principle.title}</strong><p>{principle.description}</p></div>)}</div>
            </div>
          </div>
          <div className="experience-grid">
            <div><p className="eyebrow">Experience</p>{experience.map((item) => <div className="timeline-item" key={`${item.company}-${item.period}`}><div><strong>{item.title}</strong><span>{item.period}</span></div><p>{item.company} · {item.description}</p></div>)}</div>
            <div><p className="eyebrow">Education</p>{education.map((item) => <div className="timeline-item" key={`${item.school}-${item.period}`}><div><strong>{item.title}</strong><span>{item.period}</span></div><p>{item.school} · {item.description}</p></div>)}</div>
          </div>
        </section>

        <section className="section skills-section" aria-labelledby="skills-title">
          <div className="skills-header"><div><p className="eyebrow">03 / Tools</p><h2 id="skills-title">Tools I work with.</h2></div><p>I choose tools based on the problem, project size and long-term simplicity.</p></div>
          <div className="skills-grid">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div><p className="eyebrow">04 / Contact</p><h2 id="contact-title">Have a project in mind?</h2><p>Tell me what you are building, what you need help with, or simply say hello.</p></div>
            <div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Email me <FiMail aria-hidden="true" /></a><button className="button button-secondary" type="button" onClick={copyEmail} aria-live="polite">{copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />} {copied ? "Copied" : "Copy email"}</button></div>
            <div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" /></a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" /></a><a href={cv} target="_blank" rel="noreferrer"><FiArrowUpRight aria-hidden="true" /> View CV</a></div>
          </div>
        </section>
      </main>

      <footer className="footer"><span>© {new Date().getFullYear()} Nguyen Tien Phat</span><span>Built with React + Vite</span><a href="#top" aria-label="Back to top"><FiArrowUp aria-hidden="true" /></a></footer>

      <CaseStudyModal project={activeProject} reduceMotion={reduceMotion} closeProject={closeProject} closeRef={modalCloseRef} />
    </div>
  );
}
