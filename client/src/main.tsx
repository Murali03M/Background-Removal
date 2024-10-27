
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { ClerkProvider } from '@clerk/clerk-react'
import AppContextProvider from './context/AppContext.tsx'
import { BrowserRouter } from 'react-router-dom'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY





createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AppContextProvider>
          <App />
       </AppContextProvider>


   
      </ClerkProvider>
      </BrowserRouter>
  </StrictMode>,
)
