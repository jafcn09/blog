import React, { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Preloader from './components/preloader/Preloader'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Portfolio from './components/portfolio/Portfolio'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Protección adicional contra DevTools
    if (process.env.NODE_ENV === 'production') {
      // Deshabilitar console
      console.log = () => {}
      console.warn = () => {}
      console.error = () => {}
      console.debug = () => {}

      // Detector de DevTools avanzado
      const detectDevTools = setInterval(() => {
        const start = performance.now()
        debugger
        const end = performance.now()

        if (end - start > 100) {
          console.clear()
        }
      }, 1000)

      return () => clearInterval(detectDevTools)
    }
  }, [])

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
        <Preloader onLoadComplete={handleLoadComplete} />
        {!isLoading && (
          <>
            <Header/>
            <Nav/>
            <About/>
            <Experience/>
            <Portfolio/>
            <Contact/>
            <Footer/>
          </>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </>
  )
}

export default App