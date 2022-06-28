import { Link } from "react-router-dom"

import "../../styles/naviagtion_bar.scss"
import homeIcon from "../../assets/home_icon.png"
import listIcon from "../../assets/orders_list.png"
import {useDispatch, useSelector} from "react-redux";
import {stateUpdater} from "../../store/reducers/auth";

const NavBar = () => {
    const isLoginStatus = useSelector((state) => state.authReducer.isLoginStatus)
    const dispatch = useDispatch()

    dispatch(stateUpdater())

    const allNavIcons = () => {
        return (
            <ul id='itemsList' className='nav-bar__icons'>
                <li><Link to='/dashboard'><img src={homeIcon} alt="#"/></Link></li>
                <li><Link to='/orders'><img src={listIcon} alt="#"/></Link></li>
                <li><Link to='/auth'><img src={homeIcon} alt="#"/></Link></li>
                <li><p>?</p></li>
            </ul>
        )
    }

    return (
        <aside className='nav-bar'>
            <div className='nav-bar__header'>
                <h3 className='nav-bar__header_text'>TAXI</h3>
            </div>
            {isLoginStatus ? allNavIcons() : false}
        </aside>
    )
}

export default NavBar;