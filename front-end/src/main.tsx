import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './app.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { AppLayout } from './app-layout/AppLayout.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Expenses } from './pages/Expenses.tsx'
import { Categories } from './pages/Categories.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LogIn } from './pages/LogIn.tsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="categories" element={<Categories />} />
              </Route>
              <Route path='/login' element={<LogIn />}/>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
  </StrictMode>,
)
