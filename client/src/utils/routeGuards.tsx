import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const AuthGuard = ({children}: {children: React.ReactNode}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth.value);

    if (!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth.value);
    
    if (isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    
    return children;
  };