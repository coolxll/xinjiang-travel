import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { BookingInfoCard } from './components/BookingInfoCard';
import { InteractiveMap } from './components/InteractiveMap';
import { DailyRoadbook } from './components/DailyRoadbook';
import { DecisionMatrix } from './components/DecisionMatrix';
import { LodgingStrategy } from './components/LodgingStrategy';
import { PreTripChecklist } from './components/PreTripChecklist';
import { OfficialSources } from './components/OfficialSources';
import { Footer } from './components/Footer';

// Dynamic lazy imports for heavy standalone pages & modals to optimize bundle size
const AlternativePlansPage = lazy(() =>
  import('./components/AlternativePlansPage').then((m) => ({
    default: m.AlternativePlansPage,
  }))
);

const PrintRoadbookModal = lazy(() =>
  import('./components/PrintRoadbookModal').then((m) => ({
    default: m.PrintRoadbookModal,
  }))
);

export const App: React.FC = () => {
  const [pageMode, setPageMode] = useState<'main' | 'alternatives'>(() => {
    return window.location.hash === '#alternatives' ? 'alternatives' : 'main';
  });
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Switch Page Mode & URL Hash
  const handleSwitchPageMode = (mode: 'main' | 'alternatives') => {
    setPageMode(mode);
    if (mode === 'alternatives') {
      window.location.hash = 'alternatives';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = 'main';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#alternatives') {
        setPageMode('alternatives');
      } else if (window.location.hash === '#main' || !window.location.hash) {
        setPageMode('main');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth scroll handler for main section
  const handleNavigate = (sectionId: string) => {
    if (pageMode !== 'main') {
      setPageMode('main');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navHeight = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Observe scroll to update active section in navbar
  useEffect(() => {
    if (pageMode !== 'main') return;

    const handleScroll = () => {
      const sections = ['overview', 'bookings', 'map-section', 'roadbook', 'decisions', 'lodging', 'checklist', 'sources'];
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
  }, [pageMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        pageMode={pageMode}
        onSwitchPageMode={handleSwitchPageMode}
      />

      {/* Main Content Areas */}
      <main>
        {pageMode === 'alternatives' ? (
          /* Dedicated Alternative Plans & Route Visualization Page (Lazy Loaded) */
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-bold text-slate-300">正在加载 4 套备选方案高精度全景数据...</span>
                </div>
              </div>
            }
          >
            <AlternativePlansPage
              onBackToMain={() => handleSwitchPageMode('main')}
            />
          </Suspense>
        ) : (
          /* Standard Baseline Highway Freedom Sections */
          <>
            {/* 1. Hero Overview */}
            <HeroHeader
              onExploreMap={() => handleNavigate('map-section')}
              onExploreRoadbook={() => handleNavigate('roadbook')}
              onExploreDecisions={() => handleNavigate('decisions')}
              onExploreBookings={() => handleNavigate('bookings')}
              onExploreAlternatives={() => handleSwitchPageMode('alternatives')}
            />

            {/* 2. Flight & Car Rental Time Constraint Hub */}
            <BookingInfoCard />

            {/* 3. Interactive Map */}
            <InteractiveMap />

            {/* 4. Day-by-Day Roadbook with Rich Photos */}
            <DailyRoadbook />

            {/* 5. Team Consensus & Voting Matrix with Imagery */}
            <DecisionMatrix
              onExploreAlternatives={() => handleSwitchPageMode('alternatives')}
            />

            {/* 6. Lodging & Cost Optimization */}
            <LodgingStrategy />

            {/* 7. Pre-Trip Checklist & Packing */}
            <PreTripChecklist />

            {/* 8. Official Sources & References */}
            <OfficialSources />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Offline / Print Modal (Lazy Loaded) */}
      {isPrintModalOpen && (
        <Suspense fallback={null}>
          <PrintRoadbookModal
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
