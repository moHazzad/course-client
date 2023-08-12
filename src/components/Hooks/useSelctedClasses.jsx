// import React from 'react'
import useAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

function useSelctedClasses() {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: myselectedClasses = [], refetch } = useQuery(["myselectedClasses", user?.email], 
    async () => {
      const res = await axiosSecure.get(`/myselectedClasses/${user?.email}`);
      return res.data;
    }
  );


  return [myselectedClasses, refetch]
}

export default useSelctedClasses