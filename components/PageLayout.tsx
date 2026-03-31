import React, { useEffect } from 'react';
import Header from './Header';
import TopBanner from './TopBanner';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const revealSelector = '.reveal';
    const markVisible = () => {
      document.querySelectorAll(revealSelector).forEach((el) => el.classList.add('visible'));
    };

    // Fallback: ensure content is always visible even if observer misses late-rendered nodes.
    markVisible();

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observed = new Set<Element>();
    const observeReveals = () => {
      document.querySelectorAll(revealSelector).forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };

    observeReveals();

    const mutationObserver = new MutationObserver(() => {
      markVisible();
      observeReveals();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-sans bg-white text-slate-800">
      <div className="relative z-[100]">
        <TopBanner />
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
