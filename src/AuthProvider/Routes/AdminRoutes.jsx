import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import useAdmin from "../../components/Hooks/UseAdmin";

const AdminRoutes = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoutes