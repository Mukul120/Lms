import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { authuser } = useSelector(state => state.auth);
    // ?.role === "Educator" || "student" || "Admin" 
    return authuser? children : <Navigate to="/" />;
    // return authuser ? children : <Navigate to="/" />;
};
export default ProtectedRoute;
