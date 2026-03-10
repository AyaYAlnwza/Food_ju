import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { NutritionProvider } from './lib/NutritionContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NutritionProvider>
      <App />
    </NutritionProvider>
  </StrictMode>,
);
