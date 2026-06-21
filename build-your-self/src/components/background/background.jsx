import "./background.css";

export function BackgroundImage({src}) {
  return (
    <div className="background-wrapper">
      <img src={src} className="background-image" />
      <div className="background-overlay"></div>
    </div>
  );
}