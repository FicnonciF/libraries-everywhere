import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/header'
import Home from '@/components/Page/Home'
import Join from './components/Page/Join'
// import About from '@/components/Page/About'
// import Contact from '@/components/Page/Contact'
// import Profile from '@/components/Page/Profile'
// import Footer from '@/components/footer'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/join' element={<Join />} />
        {/* <Route path='/contact' element={<Contact />} /> */}
        {/* <Route path='/profile' element={<Profile />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App