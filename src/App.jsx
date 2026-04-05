import { useState } from 'react';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [isReady, setIsReady] = useState(false);

  return (
    <LanguageProvider>
      <Preloader onExitStart={() => setIsReady(true)} />
      <div className={`bg-[#020617] min-h-screen transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar isReady={isReady} />
        <main>
          <Hero isReady={isReady} />
          <About isReady={isReady} />
          <Projects isReady={isReady} />
          <Contact isReady={isReady} />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
