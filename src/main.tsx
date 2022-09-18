import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </QueryClientProvider>
);
