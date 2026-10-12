import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    // console.log(isAuthenticated, user)
    const location = useLocation();

    if(loading) {
    // Still checking localStorage for an existing session (see AuthContext's
    // startup useEffect) — render nothing/a spinner rather than deciding yet.
        return <div>Loading</div>
    }

    if(!isAuthenticated) {
        return <Navigate to='/login' state={{from : location}} replace/>
    }

    return <Outlet />
}