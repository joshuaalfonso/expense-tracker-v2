import { ModeToggle } from "@/components/mode-toggle"
import { ToogleSidebar } from "./ToggleSidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogout } from "@/hooks/useLogout"
import { useAuthContext } from "@/hooks/useAuthContext"



export const Header = () => {

    const { logout } = useLogout();

    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }

    return (
        <header className='z-10 px-6 fixed w-full left-0 top-0 border-b border-[var(--color-border)] backdrop-blur-sm'>
            <nav className='flex items-center justify-between h-[50px] max-w-7xl mx-auto '>
                <ToogleSidebar />
                <div className='flex gap-2'>
                    <img src="low-price.png" alt="Logo" width={35}/>
                    <p className='flex items-center font-semibold text-xl'>Expense <span>Tracker</span></p>
                </div>
                <div className="flex gap-2 items-center">

                    <ModeToggle />

                    <Button 
                        variant="ghost"
                        onClick={handleLogout}
                        className="size-9"
                    >
                        <LogOut />
                    </Button>
                    <div>
                        {user && (
                            <Avatar>
                                <AvatarImage src={user.user?.picture} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    
                </div>
            </nav>
        </header>
    )
}