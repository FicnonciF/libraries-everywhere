import React from 'react'
import logo from '@/assets/Logo.svg'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
    return (
        <>
            <header className='px-24 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50'>
                <Link to="/">
                    <img src={logo} alt="" width={100} className='invert' />
                </Link>

                <nav className='flex gap-4 text-lg font-semibold'>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/profile">Profile</Link>
                </nav>
            </header>
        </>
    )
}

export default Header;