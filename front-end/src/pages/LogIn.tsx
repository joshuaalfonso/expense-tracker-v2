
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/useLogin';
import { ShieldAlertIcon } from 'lucide-react';

export const LogIn = () => {

   const { login, error } = useLogin();

    return (
        <>
            <div className='h-dvh w-full flex items-center justify-center'>
                <div className="max-w-7xl mx-auto">
                    {error && (
                        <Alert variant='destructive'>
                            <ShieldAlertIcon />
                            <AlertTitle>
                                {error}
                            </AlertTitle>
                        </Alert>
                    )}
                     <Button 
                        variant="secondary"
                        onClick={() => login()}
                    >
                        <div><img src='google.png' width={18}/></div> Sign in with Google 
                    </Button>
                </div>
            </div>
        </>
    )

}