import { useAuthContext } from "../auth/useAuthContext";


export const DashboardGreet = () => {

    const { user } = useAuthContext();

    if (!user) return <p>No user was found.</p>


    return (
        <h1 className="mb-4"> 
            Welcome, 
            <span className="text-[var(--color-primary)]">
                {' ' + user.user.name} <span className="wave">👋</span>
            </span>. 
        </h1>     
    )

}