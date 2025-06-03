import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter } from "react-router";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { App } from './App.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
  </StrictMode>,
)
