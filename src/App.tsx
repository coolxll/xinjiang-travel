import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { BookingInfoCard } from './components/BookingInfoCard';
import { InteractiveMap } from './components/InteractiveMap';
import { ModularArchitectureVisualizer } from './components/ModularArchitectureVisualizer';
import { DailyRoadbook } from './components/DailyRoadbook';
import { DecisionMatrix } from './components/DecisionMatrix';
import { LodgingStrategy } from './components/LodgingStrategy';
import { PreTripChecklist } from './components/PreTripChecklist';
import { OfficialSources } from './components/OfficialSources';
import { Footer } from './components/Footer';

import { StandaloneRoadbookPage } from './components/StandaloneRoadbookPage';

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
  const [pageMode, setPageMode] = useState<'main' | 'roadbook' | 'alternatives'>(() => {
    if (window.location.hash === '#roadbook') return 'roadbook';
    if (window.location.hash === '#alternatives') return 'alternatives';
    return 'main';
  });
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Switch Page Mode & URL Hash
  const handleSwitchPageMode = (mode: 'main' | 'roadbook' | 'alternatives') => {
    setPageMode(mode);
    if (mode === 'roadbook') {
      window.location.hash = 'roadbook';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mode === 'alternatives') {
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
      if (window.location.hash === '#roadbook') {
        setPageMode('roadbook');
      } else if (window.location.hash === '#alternatives') {
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
      const sections = ['overview', 'bookings', 'map-section', 'modular-architecture', 'roadbook', 'decisions', 'lodging', 'checklist', 'sources'];
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
      {/* Main Web Application Shell (Hidden when Print Modal is active) */}
      <div className={isPrintModalOpen ? 'no-print' : ''}>
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
          {pageMode === 'roadbook' ? (
            /* Dedicated Standalone Daily Roadbook & Navigation Companion Page (Direct首屏渲染) */
            <StandaloneRoadbookPage
              onBackToMain={() => handleSwitchPageMode('main')}
              onOpenPrint={() => setIsPrintModalOpen(true)}
            />
          ) : pageMode === 'alternatives' ? (
            /* Dedicated Alternative Plans & Route Visualization Page (Archived) */
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-8">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-bold text-slate-300">正在加载历史备选方案归档数据...</span>
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
                onExploreModularArchitecture={() => handleNavigate('modular-architecture')}
                onExploreRoadbook={() => handleSwitchPageMode('roadbook')}
                onExploreDecisions={() => handleNavigate('decisions')}
                onExploreBookings={() => handleNavigate('bookings')}
              />

              {/* 2. Flight & Car Rental Time Constraint Hub */}
              <BookingInfoCard />

              {/* 3. Interactive Map */}
              <InteractiveMap />

              {/* 4. 4-Module Architecture & 2N Elastic Pool Visualizer */}
              <ModularArchitectureVisualizer
                onOpenAlternatives={() => handleSwitchPageMode('alternatives')}
              />

              {/* 5. Day-by-Day Roadbook with Rich Photos & Embedded Amap */}
              <DailyRoadbook
                onSwitchToRoadbookMode={() => handleSwitchPageMode('roadbook')}
              />

              {/* 6. Team Consensus & Voting Matrix with Imagery */}
              <DecisionMatrix />

              {/* 7. Lodging & Cost Optimization */}
              <LodgingStrategy />

              {/* 8. Pre-Trip Checklist & Packing */}
              <PreTripChecklist />

              {/* 9. Official Sources & References */}
              <OfficialSources />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          onOpenAlternatives={() => handleSwitchPageMode('alternatives')}
        />
      </div>

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
