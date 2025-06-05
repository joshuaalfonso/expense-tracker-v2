import { Navigate, Route, Routes } from "react-router"
import { AppLayout } from "./app-layout/AppLayout"
import { Dashboard } from "./pages/Dashboard"
import { Expenses } from "./pages/Expenses"
import { Categories } from "./pages/Categories"
import { LogIn } from "./pages/LogIn"
import { useAuthContext } from "./features/auth/useAuthContext"
import { ProtectedRoute } from "./features/auth/ProtectedRoute"


export const App = () => {

    const { user } = useAuthContext();

    return (
        <Routes>

            <Route 
                path='/login' 
                element={ !user ? <LogIn /> : <Navigate to="/" /> }
            />

            <Route 
                element={ <ProtectedRoute> <AppLayout /></ProtectedRoute>}
            >
                <Route 
                    index 
                    element={ 
                        <Dashboard /> 
                     } 
                />
                <Route 
                    path="expenses" 
                    element={ 
                        // <ProtectedRoute> 
                            <Expenses /> 
                        // </ProtectedRoute>
                    }  
                />
                <Route 
                    path="categories" 
                    element={ 
                        // <ProtectedRoute> 
                            <Categories /> 
                        // </ProtectedRoute>
                     } 
                />
            </Route>
           
        </Routes>
    )
}
