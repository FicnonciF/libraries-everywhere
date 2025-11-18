import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Home from '@/components/Page/Home'
import Join from '@/components/Page/Join'
import Contributors from '@/components/Page/Contributors'
import NotFound from '@/components/Page/NotFound'
import Footer from '@/components/Footer'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/join' element={<Join />} />
        <Route path='/contributors' element={<Contributors />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App