
import { Button } from '@/components/ui/button';
import { googleAuth } from '@/services/apiAuth';
import { GoogleLogin  } from '@react-oauth/google';
import type { CredentialResponse  } from '@react-oauth/google';


export const LogIn = () => {

    const handleCredentialResponse = async (response: CredentialResponse) => {
        const idToken = response.credential;

        if (!idToken) {
            console.error('No credential found in response');
            return;
        }
        response = await googleAuth(idToken);
        console.log(response)
    }

    return (
        <>
            <Button>Log In</Button>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    // console.log(credentialResponse);
                    handleCredentialResponse(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    )

}