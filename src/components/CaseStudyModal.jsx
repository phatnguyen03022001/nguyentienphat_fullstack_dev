import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";

export function CaseStudyModal({ project, reduceMotion, closeProject, closeRef }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProject();
          }}
        >
          <motion.div
            className="case-study"
            data-case-dialog
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            aria-describedby="case-summary"
            tabIndex="-1"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          >
            <button ref={closeRef} className="modal-close" type="button" onClick={closeProject} aria-label="Close case study">
              <FiX aria-hidden="true" />
            </button>
            <img src={project.image} alt="" className="case-image" loading="eager" decoding="async" />
            <div className="case-content">
              <div className="project-meta"><span>{project.year}</span><span>{project.tag}</span></div>
              <h2 id="case-title">{project.title}</h2>
              <p className="case-summary" id="case-summary">{project.summary}</p>
              <div className="case-columns">
                <div><p className="eyebrow">The problem</p><p>{project.problem}</p></div>
                <div><p className="eyebrow">My role</p><p>{project.role}</p></div>
                <div><p className="eyebrow">What I built</p><p>{project.solution}</p></div>
              </div>
              <div className="case-columns case-columns-secondary">
                <div><p className="eyebrow">The challenge</p><p>{project.challenge}</p></div>
                <div><p className="eyebrow">Trade-off</p><p>{project.tradeoff}</p></div>
                <div><p className="eyebrow">Outcome</p><p>{project.outcome}</p></div>
              </div>
              <div className="case-decision">
                <p className="eyebrow">Key decisions</p>
                <ul>{project.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
              </div>
              <div className="case-proof">
                <p className="eyebrow">Proof</p>
                <div className="tag-list">{project.evidence.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
              <div className="case-actions">
                <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">Live demo <FiArrowUpRight aria-hidden="true" /></a>
                <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> Source code</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
