import React from 'react'
import logo from '@/assets/Logo.svg'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {

    const location = useLocation();
    return (
        <>
            <header className='px-6 sm:px-12 md:px-20 pt-6 sm:pt-8 md:pt-10 flex justify-between items-center fixed top-0 left-0 right-0 z-50'>
                <Link to="/">
                    <img src={logo} alt="" width={150} />
                </Link>

                <nav className='flex gap-3 sm:gap-4'>
                    {location.pathname === '/join' ? (
                        <Link to="/"
                            className='min-w-20 bg-white rounded-full font-roboto flex items-center justify-center px-4 py-2 font-bold text-sm md:text-base text-gray-700 hover:text-gray-600 transition-colors shadow-md'>
                            Home
                        </Link>
                    ) : (
                        <Link to="/join"
                            className='min-w-20 bg-white rounded-full font-roboto flex items-center justify-center px-4 py-2 font-bold text-sm md:text-base text-gray-700 hover:text-gray-600 transition-colors shadow-md'>
                            Join
                        </Link>
                    )}
                </nav>
            </header>
        </>
    )
}

export default Header;
