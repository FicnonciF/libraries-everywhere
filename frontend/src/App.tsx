import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Page/Home'
import Join from './components/Page/Join'
import Contributor from './components/Page/Contributor'
import NotFound from './components/Page/NotFound'
import Footer from './components/Footer'

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/join' element={<Join />} />
        <Route path='/contributor' element={<Contributor />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App