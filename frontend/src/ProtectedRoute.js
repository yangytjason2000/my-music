import { Navigate} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const ProtectedRoute = ({ children, redirectTo = '/', authenticated }) => {
    const {isSignedIn} = useAuth();
    
    if (isSignedIn !== authenticated) {
        return <Navigate  to={redirectTo} />
    }
    return children;
}

export default ProtectedRoute;