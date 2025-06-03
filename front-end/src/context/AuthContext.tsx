import { createContext, useReducer, type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";


type AuthState = {
    user: string | null;
};

type AuthAction = 
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

export const AuthContext = createContext<any>(null);

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT': 
            return {
                user: null
            }

            default :
                return state
    }
}


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            dispatch({ type: 'LOGIN', payload: parsedUser })
        } 
    }, [])

    console.log('AuthState :', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}