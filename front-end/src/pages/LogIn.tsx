
import { useLogin } from '@/hooks/useLogin';
import { GoogleLogin  } from '@react-oauth/google';


export const LogIn = () => {

    const { handleCredentialResponse } = useLogin();

    return (
        <>
            <div className='h-dvh w-full flex items-center justify-center'>
                <div className="max-w-7xl bg-red-100 mx-auto">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            // console.log(credentialResponse);
                            handleCredentialResponse(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </>
    )

}