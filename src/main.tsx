import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import SchedulePage from './SchedulePage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App lang="es" />} />
        <Route path="/en" element={<App lang="en" />} />
        <Route path="/agendar" element={<SchedulePage lang="es" />} />
        <Route path="/en/agendar" element={<SchedulePage lang="en" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
