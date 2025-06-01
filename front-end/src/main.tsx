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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="expenses" element={<Expenses />} />
           <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
