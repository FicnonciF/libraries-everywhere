import React from 'react'

const Contributor: React.FC = () => {
	return (
		<section className="container bg-[#525354] flex items-center justify-center w-full h-screen px-20 flex-col">
			<div className="flex flex-col justify-between items-start mb-4">
				<p className="text-2xl md:text-3xl font-roboto font-medium text-white">Contributors</p>
				<p className="text-xl md:text-2xl font-roboto font-light text-white">About the only thing that unites bankers, physicists, fin-tech professionals, engineers, developers, musicians is their love for books</p>
			</div>
			<div className='flex flex-wrap gap-5'>
				{Array.from({ length: 10 }).map((_, index) => (
					<div key={index} className='flex flex-col items-center justify-center w-30 h-30 rounded-full bg-white hover:text-black cursor-pointer transition-all'>
						<p className='text-center text-sm font-playfair	 font-medium'>Contributor {index + 1}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Contributor