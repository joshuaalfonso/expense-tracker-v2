import { ModeToggle } from "@/components/mode-toggle"
import { NavLink, Outlet } from "react-router"
import { ToogleSidebar } from "./ToggleSidebar"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/sonner"

export const AppLayout = () => {

    const queryClient = new QueryClient()

    return (
        <>

            <Toaster richColors theme="light"  />

            <header className='z-10 px-6 fixed w-full left-0 top-0 border-b border-[var(--color-border)] backdrop-blur-sm'>
                <nav className='flex items-center justify-between h-[50px] max-w-7xl mx-auto '>
                    <ToogleSidebar />
                    <div className='flex gap-2'>
                        <img src="low-price.png" alt="Logo" width={35}/>
                        <p className='flex items-center font-semibold text-xl'>Expense <span>Tracker</span></p>
                    </div>
                    <ModeToggle />
                </nav>
            </header>
    
            <div className='min-h-dvh py-12 max-w-7xl mx-auto flex'>
                <aside className='hidden xl:block fixed w-[276px] h-full px-4 py-8'>
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/">
                            <i className="fi fi-rr-objects-column flex"></i>
                            Dashboard  
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/expenses">
                            <i className="fi fi-rs-expense flex "></i>
                            Expenses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/categories">
                            <i className="fi fi-rr-tags flex "></i>
                            Categories
                        </NavLink>
                    </li>
                </ul>
                </aside>
        
                <main className='xl:ml-[276px] flex-1 py-8 px-6'>
                    <QueryClientProvider client={queryClient}>
                        <Outlet />
                    </QueryClientProvider>
                </main>
            
            </div>

        </>
      )
}