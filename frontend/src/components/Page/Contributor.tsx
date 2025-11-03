import React from 'react'
import { textContainer, sectionTitle, leadText } from '@/styles/typography'

const Contributor: React.FC = () => {
	return (
		<section className="bg-[#525354] w-full min-h-screen px-6 sm:px-12 md:px-20 pt-52">
			<div className={`${textContainer} items-start`}>
				<p className={`${sectionTitle} text-white`}>Contributors</p>
				<p className={`${leadText} text-white`}>
					About the only thing that unites bankers, physicists, fin-tech professionals, engineers, developers, musicians is their love for books
				</p>
			</div>
			<div className='mt-8 grid sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6'>
				{Array.from({ length: 12 }).map((_, index) => (
					<div
						key={index}
						className='flex flex-col items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:shadow transition-all w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32'
					>
						<p className='text-center text-xs sm:text-sm md:text-base font-playfair font-medium px-2'>Contributor {index + 1}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Contributor