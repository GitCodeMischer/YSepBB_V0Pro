'use client';

/**
 * Creates an inline script element that suppresses useLayoutEffect warnings 
 * This runs before React loads to prevent any warnings from appearing
 */
export default function SuppressWarningScript() {
  // The script content to execute in the browser
  const scriptContent = `
    (function() {
      // Override console.error to filter useLayoutEffect warnings
      const originalError = console.error;
      console.error = function() {
        if (arguments[0] && 
            typeof arguments[0] === 'string' && 
            arguments[0].includes('useLayoutEffect does nothing on the server')) {
          // Suppress the specific warning
          return;
        }
        // Call original for all other errors
        originalError.apply(console, arguments);
      };
    })();
  `;

  return (
    <script 
      dangerouslySetInnerHTML={{ __html: scriptContent }} 
      suppressHydrationWarning={true}
    />
  );
} 