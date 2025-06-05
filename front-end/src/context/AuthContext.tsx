import { createContext, useReducer, type ReactNode, useEffect } from "react";

type AuthState = {
    user: string | null;
    loading: boolean
};

const initialState: AuthState = {
  user: null,
  loading: true
};


type AuthAction = 
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

export const AuthContext = createContext<any>(null);

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                user: action.payload, loading: false
            }
        case 'LOGOUT': 
            return {
                user: null, loading: false
            }
        case 'SET_LOADING':
      return { ...state, loading: action.payload };

            default :
                return state
    }
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const expiresAt = parsedUser.user.exp * 1000;
            const now = Date.now();

            if (expiresAt >= now) {
                dispatch({ type: 'LOGIN', payload: parsedUser })
            } else {
                localStorage.removeItem('user');
                dispatch({ type: 'LOGOUT'})
            }
        } 

        dispatch({ type: 'SET_LOADING', payload: false }); // Done checking
    }, [])

    console.log('AuthState :', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}