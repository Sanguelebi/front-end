import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@/store/store';
import type { Role } from '@/models/api';

interface ProtectedRouteProps {
    allowedRoles?: Role[];
    children: ReactNode;
}

function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
    const user = useSelector((state: RootState) => state.user);

    const isAuthenticated = user.id !== -1 && Boolean(user.role);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role as Role)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;

