import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import FeaturedWorks from './components/FeaturedWorks';
import Experience from './components/Experience';
import ContactCTA from './components/ContactCTA';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import ChatWidget from './components/ChatWidget';

import ShapeGrid from './components/ShapeGrid';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="relative min-h-screen selection:bg-[#ff4d00] selection:text-white">
      {/* Full Page Dynamic ShapeGrid Canvas Background */}
      <ShapeGrid
        speed={0.45}
        squareSize={42}
        direction="diagonal"
        shape="square"
        hoverTrailAmount={1}
      />

      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50 opacity-40 dark:opacity-20" />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Custom Luxury Cursor */}
      <Cursor />

      {/* Navigation Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col gap-0">
        <Hero onOpenContact={handleOpenContact} />
        <About />
        <Expertise onOpenContact={handleOpenContact} />
        <FeaturedWorks onOpenProject={handleOpenContact} />
        <Experience />
        <ContactCTA onOpenContact={handleOpenContact} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Left Chatbot Assistant */}
      <ChatWidget onOpenContact={handleOpenContact} />

      {/* Interactive Contact / Tech Talk Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </div>
  );
}
