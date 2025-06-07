import { NavLink, Outlet } from "react-router"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Header } from "./Header"
import { ThemeToaster } from "./ThemeToaster";

export const AppLayout = () => {

    const queryClient = new QueryClient();

    // console.log('App layout init')

    return (
        <>

            <ThemeToaster />

            <Header />
    
            <div className='min-h-dvh py-12 max-w-7xl mx-auto flex'>
                <aside className='hidden xl:block fixed w-[276px] h-full  py-8 pr-6'>
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
        
                <main className='xl:ml-[276px] flex-1 py-8 px-6 xl:px-0 '>
                    <QueryClientProvider client={queryClient}>
                        <Outlet />
                    </QueryClientProvider>
                </main>
            
            </div>

        </>
      )
}