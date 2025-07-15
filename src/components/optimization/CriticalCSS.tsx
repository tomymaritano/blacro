// Critical CSS for above-the-fold content
export default function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Minimal critical styles - let Tailwind handle the rest */
        *, *::before, *::after {
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
        
        /* Prevent layout shifts for images */
        img, video {
          max-width: 100%;
          height: auto;
        }
        
        /* Font loading optimization */
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