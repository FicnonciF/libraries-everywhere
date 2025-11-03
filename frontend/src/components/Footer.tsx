import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer: React.FC = () => {
	const email = "info@librarieseverywhere.com";
	const location = useLocation();
	const [isContributor, setIsContributor] = useState(false);

	useEffect(() => {
		setIsContributor(location.pathname === "/contributor");
	}, [location.pathname]);

	return (
		<footer className='fixed bottom-0 md:bottom-2 inset-x-0 z-50 px-6 sm:px-12 md:px-20 bg-[#525354] w-full md:bg-transparent'>
			<div className='text-xs sm:text-sm md:text-base font-roboto font-medium flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-white'>
				{isContributor ? (
					<Link to="/join" className='mx-1 hover:underline'>Join</Link>
				) : (
					<Link to="/contributor" className='mx-1 hover:underline'>Contributors</Link>
				)}
				<span className='opacity-70'>|</span>
				<a
					href={`mailto:${email}`}
					className="mx-1 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer text-inherit"
				>
					{email}
				</a>
				<span className='opacity-70'>|</span>
				<span className='mx-1'>&copy; {new Date().getFullYear()} Bookminers Pvt Ltd. All rights reserved.</span>
			</div>
		</footer>
	)
}

export default Footer
