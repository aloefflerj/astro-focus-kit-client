import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './common/utils/queryClient';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { ModalProvider } from './contexts/ModalProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <AuthProvider>
                <ModalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ModalProvider>
            </AuthProvider>
        </React.StrictMode>
    </QueryClientProvider>
);
