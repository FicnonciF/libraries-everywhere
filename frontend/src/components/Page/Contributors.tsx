import React from 'react'
import { textContainer, sectionTitle, leadText } from '@/styles/typography'
import { contributors } from '@/data/contributors'

const Contributor: React.FC = () => {
	return (
		<section className="bg-[#525354] w-full min-h-screen px-6 sm:px-12 md:px-20 pt-52">
			<div className={`${textContainer} items-start`}>
				<p className={`${sectionTitle} text-white`}>Contributors</p>
				<p className={`${leadText} text-white`}>
					About the only thing that unites bankers, physicists, fin-tech professionals, engineers, developers, musicians is their love for books
				</p>
			</div>
			<div className='mt-8 flex flex-wrap md:gap-8 sm:gap-6 gap-4'>
				{contributors.map((contributor, index) => (
					<div
						key={index}
						className='relative flex flex-col items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-100 hover:shadow transition-all w-20 h-20 sm:w-28 sm:h-28 md:w-30 md:h-30 cursor-pointer'
					>
						<img src={contributor.image} alt={contributor.name} className='w-full h-full object-cover rounded-full md:grayscale md:hover:grayscale-0 transition-all' />
						<p className='absolute -bottom-1 text-center text-xs sm:text-sm md:text-base font-roboto px-3 border border-gray-100 bg-white rounded-xl'>{contributor.name}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Contributor