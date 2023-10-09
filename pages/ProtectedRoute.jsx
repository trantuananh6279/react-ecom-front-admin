import { getUserFromLocalStorage } from '../utils/localStorage';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const user = getUserFromLocalStorage();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
}
