
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/features/auth/useLogin';
import { Loader2Icon, ShieldAlertIcon } from 'lucide-react';

export const LogIn = () => {

   const { login, error, loading } = useLogin();

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
                        disabled={loading}
                    >
                        { loading ? 
                            <Loader2Icon className='animate-spin'/> : 
                            <img src='google.png' width={18}/>
                        }
                            Sign in with Google 
                    </Button>
                </div>
            </div>
        </>
    )

}