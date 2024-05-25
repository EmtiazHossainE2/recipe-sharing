import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes.jsx';
import { Toaster } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const queryClient = new QueryClient();

const stripePromise = loadStripe(
  "pk_test_51L14pjDEsxnXfJbTiZgmC0dz3uHctqNriljNuVFrVk6oTpM7wsc9tHAymdCZlelQzHvDWCKD1yfU0LY6Ccm13tpi00ExQ2fXbe",
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <div className="">
            <Elements stripe={stripePromise}>
              <RouterProvider router={router} />
            </Elements>
          </div>
          <Toaster />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
