// components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useAuthContext } from "./useAuthContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuthContext();

    if (loading) return <p>Loading...</p>

    return user ? children : <Navigate to="/login" />;
};
