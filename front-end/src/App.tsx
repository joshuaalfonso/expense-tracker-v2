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

            <Route element={<AppLayout />}>
                <Route 
                    index 
                    element={ user ? <Dashboard /> : <Navigate to="/login" /> } 
                />
                <Route 
                    path="expenses" 
                    element={ user ? <Expenses /> : <Navigate to="/login" />}  
                />
                <Route 
                    path="categories" 
                    element={ user ? <Categories /> : <Navigate to="/login" />} 
                />
            </Route>

            <Route 
                path='/login' 
                element={ !user ? <LogIn /> : <Navigate to="/" />}
            />

        </Routes>
    )
}