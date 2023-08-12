import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";



const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data.admin;
        }
    })

    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
      queryKey: ['isInstructor', user?.email],
      enabled: !loading,
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
        return res.data.instructor;
      }
    });
    
    return [isAdmin, isAdminLoading,  isInstructor, isInstructorLoading]
};

export default useAdmin;