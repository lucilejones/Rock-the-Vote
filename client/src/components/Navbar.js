import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
    const { logout } = props

    return (
        <div>
            {/* this will show just the user's added issues */}
            <Link to="/profile">Profile</Link>
            {/* this will show all the issues */}
            <Link to="/public">Public</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}