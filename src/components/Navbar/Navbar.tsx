import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {ReactComponent as HomeIcon} from '../../assets/home.svg'
import {ReactComponent as StatsIcon} from '../../assets/stats.svg'
import {ReactComponent as ProgresIcon} from '../../assets/album.svg'
import './Navbar.css'


export default function Navbar() {

    const location = useLocation()
  return (
    <div className='navbar'>
        <Link to='/'><ProgresIcon className={location.pathname === '/' ? 'selected-icon' : 'icon'}/></Link>
        <Link to='/progress'><HomeIcon className={location.pathname === '/progress' ? 'selected-icon' : 'icon'}/></Link>
        <Link to='/stats'><StatsIcon className={location.pathname === '/stats' ? 'selected-icon' : 'icon'}/></Link>
    </div>
  )
}
