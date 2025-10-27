import React from 'react'
import logo from '@/assets/Logo.svg'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
	return (
		<>
			<header className='px-24 pt-10 flex justify-between items-center fixed top-0 left-0 right-0 z-50'>
				<Link to="/">
					<img src={logo} alt="" width={80} className='invert' />
				</Link>

				<nav className='flex gap-4 text-lg font-semibold'>
					<Link to="/join"
						className='w-20 h-5 bg-white rounded-full flex items-center justify-center p-4.5 font-semibold'>
						Join
					</Link>
				</nav>
			</header>
		</>
	)
}

export default Header;