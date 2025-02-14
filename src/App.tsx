import Hero from "./Components/Hero.tsx";
import About from "./Components/About.tsx";
import NavBar from "./Components/NavBar.tsx";
import Features from "./Components/Features.tsx";
import Story from "./Components/Story.tsx";
import Contact from "./Components/contact.tsx";
import Footer from "./Components/Footer.tsx";


function App() {
  return (
      <main className='relative min-h-screen w-screen overflow-x-hidden'>
          <NavBar/>
          <Hero/>
          <About/>
          <Features/>
          <Story/>
          <Contact/>
          <Footer/>
      </main>
  )
}

export default App
