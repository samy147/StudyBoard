import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Activation MSW seulement si ?msw=on dans l'URL
async function activerMSW() {
    const params = new URLSearchParams(window.location.search);
    const activer = params.get('msw') === "on";

    if (activer) {
        const { worker } = await import('./mocks/msw/browser.js');
        await worker.start();
        console.log('✓ MSW activé - mode mock API');
    } else {
        console.log('MSW désactivé - utilisation du backend réel ou mode offline');
    }
}

activerMSW().then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
});

