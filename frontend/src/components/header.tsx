import React from 'react'
import logo from '@/assets/Logo.svg'
import { Link, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
	return (
		<>
			<header className='mx-20 pt-10 flex justify-between items-start fixed top-0 left-0 right-0 z-50'>
				<Link to="/">
					<img src={logo} alt="" width={150} />
				</Link>

				<nav className='flex gap-4'>
					{useLocation().pathname === '/join' ? (
						<Link to="/"
							className='w-20 h-5 bg-white rounded-full font-roboto flex items-center justify-center p-4.5 font-bold text-md text-gray-700 hover:text-gray-600 transition-colors shadow-md'>
							Home
						</Link>
					) : (
						<Link to="/join"
							className='w-20 h-5 bg-white rounded-full font-roboto flex items-center justify-center p-4.5 font-bold text-md text-gray-700 hover:text-gray-600 transition-colors shadow-md'>
							Join
						</Link>
					)}
				</nav>
			</header>
		</>
	)
}

export default Header;