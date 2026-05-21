import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { JourneyVault } from './components/JourneyVault';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-[#020617] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <JourneyVault />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
