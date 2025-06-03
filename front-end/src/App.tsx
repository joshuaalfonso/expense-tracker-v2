import { Navigate, Route, Routes } from "react-router"
import { AppLayout } from "./app-layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Expenses } from "./pages/Expenses"
import { Categories } from "./pages/Categories"
import { LogIn } from "./pages/LogIn"
import { useAuthContext } from "./hooks/useAuthContext"


export const App = () => {

    const { user } = useAuthContext();

    return (
        <Routes>

            <Route 
                path='/login' 
                element={ !user ? <LogIn /> : <Navigate to="/" /> }
            />

            <Route 
                element={ user ? <AppLayout /> : <Navigate to="/login" /> }
            >
                <Route 
                    index 
                    element={ <Dashboard /> } 
                />
                <Route 
                    path="expenses" 
                    element={ <Expenses /> }  
                />
                <Route 
                    path="categories" 
                    element={ <Categories /> } 
                />
            </Route>
           
        </Routes>
    )
}
