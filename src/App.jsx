import { useState } from 'react';
import './App.css';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { JourneyVault } from './components/JourneyVault';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  // State 'isReady' ini dipake buat nandain kalo preloader udah selesai loading
  const [isReady, setIsReady] = useState(true);

  return (
    <>
      {/* Preloader-nya sengaja di-comment dulu nih. Kalo mau dipake lagi tinggal di-uncomment aja ya! */}
      {/* <Preloader onExitStart={() => setIsReady(true)} /> */}
      
      {/* Container utama portfolio. Pas loading selesai (isReady), opacity-nya bakal transisi halus ke 100% */}
      <div className={`bg-[#020617] min-h-screen transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigasi atas */}
        <Navbar isReady={isReady} />
        
        {/* Kumpulan section isi portfolio */}
        <main>
          <Hero isReady={isReady} />
          <About isReady={isReady} />
          <Projects isReady={isReady} />
          <JourneyVault isReady={isReady} />
          <Contact isReady={isReady} />
        </main>
        
        {/* Bagian kaki halaman */}
        <Footer />
      </div>
    </>
  );
}

export default App;
