
import { useAuthContext } from '@/hooks/useAuthContext';
import { useLogin } from '@/hooks/useLogin';
import { GoogleLogin  } from '@react-oauth/google';


export const LogIn = () => {

    const { user } = useAuthContext();

    const { handleCredentialResponse } = useLogin();

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    // console.log(credentialResponse);
                    handleCredentialResponse(credentialResponse)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            {user && (
                <div>
                    {user.user.name}
                </div>
            )}
        </>
    )

}