import { createPortal } from "react-dom";
import './overlay.css'

export function Overlay({ children }) {
  return createPortal(
    <div className="overlay-div">
      {children}
    </div>,
    document.body
  );
}