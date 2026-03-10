import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { NutritionProvider } from './lib/NutritionContext.tsx';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import { AuthProvider } from './lib/AuthContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <NutritionProvider>
          <App />
        </NutritionProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
