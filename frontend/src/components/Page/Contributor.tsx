import React from 'react'

const Contributor: React.FC = () => {
	return (
		<section className="container bg-[#525354] flex items-center justify-between w-full h-screen px-20 gap-20">
			<div className="flex flex-col justify-between items-start mb-4">
				<p className="text-2xl md:text-3xl font-roboto font-medium text-white">Contributors</p>
				<p className="text-xl md:text-2xl font-roboto font-light text-white">About the only thing that unites bankers, physicists, fin-tech professionals, engineers, developers, musicians is their love for books</p>
			</div>
		</section>
	)
}

export default Contributor