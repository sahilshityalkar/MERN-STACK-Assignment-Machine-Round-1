import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>
);