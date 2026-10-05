import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInit: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS with clean smooth settings
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true, // elements animate once when scrolled into view
      mirror: false,
      offset: 40,
      delay: 0,
      debounceDelay: 50,
      throttleDelay: 99,
    });

    // Refresh AOS when window resizes
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Scroll to top on route change & refresh AOS so newly loaded page content animates properly
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
};

/**
 * Utility function to refresh AOS whenever dynamic content changes (filters, new items, tabs)
 */
export const refreshAOS = (delay = 100) => {
  setTimeout(() => {
    AOS.refresh();
  }, delay);
};
