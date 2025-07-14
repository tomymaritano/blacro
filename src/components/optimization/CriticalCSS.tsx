// Critical CSS for above-the-fold content
export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical styles for immediate render */
        body { 
          margin: 0; 
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          color: #000000;
        }
        
        /* Navigation critical styles */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          backdrop-filter: blur(12px);
        }
        
        /* Hero section critical styles */
        .hero-section {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Prevent layout shifts */
        img, video {
          max-width: 100%;
          height: auto;
        }
        
        /* Critical loading state */
        .loading-placeholder {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 2s infinite;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      `
    }} />
  );
}