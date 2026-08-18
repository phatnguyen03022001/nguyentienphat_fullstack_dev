import { FiArrowUpRight } from "react-icons/fi";

export function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={`project-card project-card-${index + 1} reveal-up`}>
      <div className="project-image-wrap">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="project-image"
          loading="lazy"
          decoding="async"
        />
        <span className="project-number" aria-hidden="true">0{index + 1}</span>
      </div>
      <div className="project-body">
        <div className="project-meta"><span>{project.year}</span><span>{project.tag}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-footer">
          <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <button
            className="arrow-button"
            type="button"
            data-project-trigger
            onClick={onOpen}
            aria-label={`Read case study for ${project.title}`}
          >
            <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
