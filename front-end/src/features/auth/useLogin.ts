
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {

    const { dispatch } = useAuthContext();

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
  
            // Send to your backend for token exchange and custom JWT creation
            const res = await fetch('http://localhost:3000/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeResponse.code }),
            });

            const userData = await res.json();

            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({type: 'LOGIN', payload: userData})
        },
        onError: (error) => {
            console.log('google auth :' + error)
        },
        flow: 'auth-code',
    });

    return { login }


}