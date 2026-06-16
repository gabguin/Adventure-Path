import './overlay.css'
export function Overlay({children}){
  return(
    <div className="overlay-div">
      {children}
    </div>
  )
}