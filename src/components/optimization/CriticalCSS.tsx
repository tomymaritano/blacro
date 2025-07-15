// Critical CSS for above-the-fold content
export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical styles for immediate render */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-size-adjust: 100%;
        }
        
        body { 
          margin: 0; 
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #FFFDF9;
          color: #000000;
          line-height: 1.5;
          min-height: 100vh;
        }
        
        /* Navigation critical styles */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          backdrop-filter: blur(12px);
          height: 64px;
        }
        
        /* Main content padding to account for navbar */
        main {
          padding-top: 64px;
        }
        
        /* Grid system critical styles */
        .grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 0.75rem;
        }
        
        /* Typography critical styles */
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          line-height: 1.2;
        }
        
        /* Hero section critical styles */
        .hero-section {
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Prevent layout shifts */
        img, video {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        /* Aspect ratio boxes for images */
        [data-aspect-ratio] {
          position: relative;
          width: 100%;
          background: #f5f5f5;
        }
        
        [data-aspect-ratio]::before {
          content: "";
          display: block;
          padding-top: var(--aspect-ratio, 56.25%);
        }
        
        [data-aspect-ratio] > * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        /* Links */
        a {
          color: inherit;
          text-decoration: none;
        }
        
        /* Buttons */
        button {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          cursor: pointer;
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
          .grid {
            gap: 0.5rem;
          }
          
          nav {
            height: 56px;
          }
          
          main {
            padding-top: 56px;
          }
        }
        
        /* Hide elements until fonts load */
        .font-loading {
          visibility: hidden;
        }
        
        .fonts-loaded .font-loading {
          visibility: visible;
        }
      `
    }} />
  );
}