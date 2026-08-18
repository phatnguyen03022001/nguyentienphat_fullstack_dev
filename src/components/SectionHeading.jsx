export function SectionHeading({ eyebrow, title, text, titleId }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}
