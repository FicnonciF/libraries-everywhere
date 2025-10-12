import React, { useState } from 'react'
import logo from '@/assets/Logo.svg'
import { Button } from '@/components/ui/button'
import WaitlistModal from '@/components/Modal/WaitlistModal'

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleJoinWaitlist = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className='h-screen bg-blue-500'>
            <div className='flex flex-col items-center justify-center h-full'>
                <h2 className='text-3xl font-semibold'>Book Miners</h2>
                <img src={logo} alt="" />
                <p className='text-lg mb-5'>The ultimate destination for all your book needs</p>
                <Button
                    variant='outline'
                    className='cursor-pointer hover:bg-black hover:text-white'
                    onClick={handleJoinWaitlist}
                >
                    Join Waitlist
                </Button>
            </div>

            <WaitlistModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}

export default Home