import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    const { logout } = props

    return (
        <nav className="nav justify-content-end p-2 nav-background">
                {/* this will show just the user's added issues */}
                <Link to="/profile" className='nav-item nav-link text-white'>Profile</Link>
                {/* this will show all the issues */}
                <Link to="/public" className='nav-item nav-link text-white'>Public</Link>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
        </nav>
    )
}