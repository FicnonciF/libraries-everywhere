import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer: React.FC = () => {
	const email = "info@librarieseverywhere.com";
	const location = useLocation();
	const [isContributer, setIsContributer] = useState(false);

	useEffect(() => {
		setIsContributer(location.pathname === "/contributer");
	}, [location.pathname]);

	return (
		<footer className='absolute bottom-2 right-0 z-50'>
			<div className='mr-10 flex justify-between items-start text-white font-bold'>
				{isContributer ? (
					<Link to="/join" className='mx-2'>Join</Link>
				) : (
					<Link to="/contributer" className='mx-2'>Current Donors</Link>
				)} |
				<a
					href={`mailto:${email}`}
					className="mx-2 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer text-inherit"
				>
					{email}
				</a> |
				<span className='mx-2'>&copy; {new Date().getFullYear()} Bookminers Pvt Ltd. All rights reserved.</span>
			</div>
		</footer>
	)
}

export default Footer
