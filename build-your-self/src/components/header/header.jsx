import './header.css'
import { Link } from 'react-router-dom'
export function Header(){
  return(
    <div className="header-div">
      <Link to="/" className='header-link'>
      <div >
        <p className='home-link'>Home</p>
      </div>
      </Link>
      <Link to="/quest" className='quest-link'>
      <div><p className='quest-link'>Quest</p></div>
      </Link>
    </div>
  )
}