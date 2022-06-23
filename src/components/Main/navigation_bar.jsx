import { Link } from "react-router-dom"

import "../../styles/naviagtion_bar.scss"
import icon from "../../assets/home_icon.png"

const NavBar = () => {
    return (
        <aside className='nav-bar'>
            <div className='nav-bar__header'>
                <h3 className='nav-bar__header_text'>TAXI</h3>
            </div>
            <ul className='nav-bar__icons'>
                <li><Link to='/sign-up'><img src={icon} alt="#"/></Link></li>
                <li><Link to='/sign-in'><img src={icon} alt="#"/></Link></li>
                <li><Link to='/auth'><img src={icon} alt="#"/></Link></li>
                <li><p>?</p></li>
            </ul>
        </aside>
    )
}

export default NavBar;