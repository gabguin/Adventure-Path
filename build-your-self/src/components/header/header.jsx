import './header.css'
import { Link } from 'react-router-dom'
export function Header(){
  return(
    <div className="header-div">
      <Link to="/">
      <div >
        <p className='home-link'>Home</p>
      </div>
      </Link>
      <Link to="/quest" >
      <div><p className='quest-link'>Quest</p></div>
      </Link>
      <Link to="/reward">
      <div><p className='reward-link'>Reward</p></div>
      </Link>
    </div>
  )
}