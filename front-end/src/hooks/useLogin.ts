import { googleAuth } from "@/services/apiAuth";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuthContext } from "./useAuthContext";




export const useLogin = () => {

    const { dispatch } = useAuthContext();

    const handleCredentialResponse = async (response: CredentialResponse) => {
        const idToken = response.credential;

        if (!idToken) {
            console.error('No credential found in response');
            return;
        }
        
        response = await googleAuth(idToken);

        if (response.message === 'Authenticated') {
            //save response to local storage
            localStorage.setItem('user', JSON.stringify(response));

            // dispatch login
            dispatch({type: 'LOGIN', payload: response})
        }

    }

    return { handleCredentialResponse }


}