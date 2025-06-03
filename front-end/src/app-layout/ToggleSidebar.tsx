import { useState } from "react"
import { NavLink } from "react-router";

import { createPortal } from 'react-dom';


export const ToogleSidebar = () => {

    const [open, setOpen] = useState<boolean>(false);

    const handleToggle = () => {
        setOpen(!open)
    }

   return (
        <>
            {/* <button onClick={handleToggle} className="block xl:hidden">toggle</button> */}
            <div 
                className="block xl:hidden cursor-pointer hover:bg-[var(--color-primary)] hover:text-white p-2 rounded-full duration-300 ease-out"
                onClick={handleToggle}
            >
                <i className="fi fi-rr-bars-staggered flex text-lg"></i>
            </div>

            {createPortal(
                <div 
                    className={`fixed left-0 top-0 z-20 w-full h-dvh transition-opacity duration-300
                        backdrop-blur-xs ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
                    }
                >
                     <aside
                        className={`
                            fixed left-0 top-0 z-30 h-full w-[276px] px-4 py-8
                            bg-[var(--color-background)] border-r border-[var(--color-border)]
                            transform transition-transform duration-300
                            ${open ? 'translate-x-0' : '-translate-x-full'}
                        `}
                    >
                        <ul className="space-y-2">
                            <li>
                                <NavLink to="/" onClick={handleToggle}>
                                    <i className="fi fi-rr-objects-column flex"></i>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/expenses" onClick={handleToggle}>
                                    <i className="fi fi-rs-expense flex"></i>
                                    Expenses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/categories" onClick={handleToggle}>
                                    <i className="fi fi-rr-tags flex "></i>
                                    Categories
                                </NavLink>
                            </li>
                        </ul>
                    </aside>
                </div>,
                document.body
            )}
        </>
    );
}