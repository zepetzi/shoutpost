import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";


export default function LoginRedirect({ children }){
    const { currentUser } = useAuth()

    return (currentUser ? <Navigate to="/profile"/> : children);
}
