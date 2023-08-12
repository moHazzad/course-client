// import React from 'react';
// import useSelecedClass from '../../../hooks/useSelecedClass';
// import CheckOut from './CheckOut';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import useSelctedClasses from '../../../Hooks/useSelctedClasses';
import CheckOut from './CheckOut';

const Payment = () => {
    const [myselectedClasses] = useSelctedClasses();

    const total = myselectedClasses.reduce((sum, cls) => sum + cls.price, 0);
    const price = parseFloat(total.toString()).toFixed(2);

    const stripePromise = loadStripe(import.meta.env.VITE_PK); //published key

    const {id} = useParams();
    const selectCls = myselectedClasses.find(cls => cls._id === id)
    return (
        <div>
            <h1 className='text-3xl font-bold mb-3' >my payments</h1>
            <Elements stripe={stripePromise}>
                <CheckOut myselectedClasses={selectCls} price={price} classId={id}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;