import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//Activation si ?msw=on OU localStorage.msw === "on"
async function activerMSW() {
    const params = new URLSearchParams(window.location.search);
    const force = params.get('msw') === "on" || localStorage.getItem('msw') === "on";

    if (force) {
        const { worker } = await import('./mocks/msw/browser.js');
        await worker.start();
        console.log("MSW activé");
    }
}

activerMSW().then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
});

