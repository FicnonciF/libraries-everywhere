import React from 'react'
import logo from '@/assets/Logo.svg'

const Home: React.FC = () => {
	return (
		<div className='h-screen bg-blue-500'>
			<div className='flex flex-col items-center justify-center h-full'>
				<h2 className='text-3xl font-semibold'>Book Miners</h2>
				<img src={logo} alt="" width={100} className='my-4' />
				<p className='text-lg mb-5'>The ultimate destination for all your book needs</p>
			</div>
		</div>
	)
}

export default Home