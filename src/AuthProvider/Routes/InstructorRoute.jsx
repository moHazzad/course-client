import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

import useInstructor from "../../components/Hooks/useInstructor";

const InstructorRoutes = ({ children }) => {
        const [isInstructor, isInstructorLoading] = useInstructor()
        const { user, loading } = useContext(AuthContext);
        const location = useLocation();
    
        if(loading || isInstructorLoading){
            return <progress className="progress w-56"></progress>
        }
    
        if (user && isInstructor) {
            return children;
        }
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    };

export default InstructorRoutes