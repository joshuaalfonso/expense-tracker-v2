// components/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useAuthContext } from "./useAuthContext";
import type { ReactNode } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuthContext();

    if (loading) return (
        <div className="fixed left-0 top-0 w-full h-dvh grid place-items-center">
            <LoadingSpinner />
        </div>
    )

    return user ? children : <Navigate to="/login" />;
};
