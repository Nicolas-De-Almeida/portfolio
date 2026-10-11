import Header from './components/Header'
import About from './pages/About'
import Projects from './pages/Projects'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'
import Footer from './components/Footer'


function App() {

  return (
    <div>
      <Header/>
      <main>
        <About/>
        <Projects/>
        <Experiences/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
