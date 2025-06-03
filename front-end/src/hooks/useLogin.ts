import { googleAuth } from "@/services/apiAuth";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuthContext } from "./useAuthContext";

export interface authenticatedResponse {
    message: string,
    token: string,
    user : User
}

export interface User {
    sub: string;
    name: string,
    email: string,
    picture: string,
}

export const useLogin = () => {

    const { dispatch } = useAuthContext();

    const handleCredentialResponse = async (response: CredentialResponse) => {
        
        const idToken = response.credential;

        if (!idToken) {
            console.error('No credential found in response');
            return;
        }
        
        const authenticatedResponse: authenticatedResponse = await googleAuth(idToken);

        // console.log(response);

        if (authenticatedResponse.message === 'Authenticated') {

            //save response to local storage
            localStorage.setItem('user', JSON.stringify(authenticatedResponse));

            // dispatch login
            dispatch({type: 'LOGIN', payload: authenticatedResponse})
        }

    }

    return { handleCredentialResponse }


}