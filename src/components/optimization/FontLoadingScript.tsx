// Font loading optimization script
export default function FontLoadingScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Mark when fonts are loaded
          if ('fonts' in document) {
            document.fonts.ready.then(function() {
              document.documentElement.classList.add('fonts-loaded');
            });
          } else {
            // Fallback for browsers without Font Loading API
            document.documentElement.classList.add('fonts-loaded');
          }
        `,
      }}
    />
  );
}