
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly }: { children: JSX.Element, adminOnly?: boolean }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
