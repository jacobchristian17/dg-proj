import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./_hooks/useAuth";

export default function RequireAuth({ allowedRoles }) {
    const { auth } = useAuth();
    const loc = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to='/unauthorized' state={{ from: loc }} replace />
                : <Navigate to='/login' state={{ from: loc }} replace />

    )
}