import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdminCMSDashboard } from './AdminCMSDashboard';
import '../index.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <AdminCMSDashboard />
    </React.StrictMode>
  );
}
