import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { InteractiveMap } from './components/InteractiveMap';
import { DailyRoadbook } from './components/DailyRoadbook';
import { DecisionMatrix } from './components/DecisionMatrix';
import { LodgingStrategy } from './components/LodgingStrategy';
import { PreTripChecklist } from './components/PreTripChecklist';
import { OfficialSources } from './components/OfficialSources';
import { PrintRoadbookModal } from './components/PrintRoadbookModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Observe scroll to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'map-section', 'roadbook', 'decisions', 'lodging', 'checklist', 'sources'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPrint={() => setIsPrintModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Overview */}
        <HeroHeader
          onExploreMap={() => handleNavigate('map-section')}
          onExploreRoadbook={() => handleNavigate('roadbook')}
          onExploreDecisions={() => handleNavigate('decisions')}
        />

        {/* 2. Interactive Map */}
        <InteractiveMap />

        {/* 3. Day-by-Day Roadbook */}
        <DailyRoadbook />

        {/* 4. Team Consensus & Voting Matrix */}
        <DecisionMatrix />

        {/* 5. Lodging & Cost Optimization */}
        <LodgingStrategy />

        {/* 6. Pre-Trip Checklist & Packing */}
        <PreTripChecklist />

        {/* 7. Official Sources & References */}
        <OfficialSources />
      </main>

      {/* Footer */}
      <Footer />

      {/* Offline / Print Modal */}
      <PrintRoadbookModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
};

export default App;
