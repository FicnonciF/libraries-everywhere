import React from 'react'

const Footer: React.FC = () => {

    // const currentYear = new Date().getFullYear();

    return (
        <footer className='h-[100px] px-10 py-4 flex justify-between items-center flex-col bg-gray-100'>
            <h1 className='text-xl font-bold'>Fic-Nonfic</h1>
            <p className='text-sm flex items-center gap-2 flex-col'>
                <span>Made in India with ❤️</span>
                {/* <span>All rights reserved©<span className='text-blue-500'> {currentYear}</span></span> */}
            </p>
        </footer>
    )
}

export default Footer