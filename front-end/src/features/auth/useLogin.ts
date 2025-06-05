
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";


export const useLogin = () => {

    const { dispatch } = useAuthContext();

    const [error, setError] = useState('');

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
  
           try {
                // Send to your backend for token exchange and custom JWT creation
                const res = await fetch('http://localhost:3000/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: codeResponse.code }),
                });

                // throw error if token exchange failed
                if (!res.ok) {
                    console.error(await res.json())
                    throw new Error('An unknown error occurred while logging in.');
                }
            
                const userDataResponse = await res.json();

                // store user to localStorage and authContext
                localStorage.setItem('user', JSON.stringify(userDataResponse));
                dispatch({type: 'LOGIN', payload: userDataResponse})
           }

           catch (error: any) {
                setError(error.message)
           }
        },
        onError: (error) => {
            console.log('google auth :' + error)
        },
        flow: 'auth-code',
    });

    return { login, error }


}