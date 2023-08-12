import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { useContext } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useEffect } from "react";
import './CheckOut.css'

const CheckOut = ({ myselectedClasses, price }) => {
    console.log(myselectedClasses);

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('')


    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('')

        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id);
            const payment = {
                name: myselectedClasses.name,
                email: user.email,
                image: myselectedClasses.image,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: myselectedClasses.length,
                selectedClass: myselectedClasses._id,
                enrolledClass: myselectedClasses.classId
            }

            axiosSecure.post('/payments', payment)
                .then((res) => {
                    axiosSecure.patch(`/totalStudent/${myselectedClasses?.classId}`)
                    .then(res => {
                        console.log(res.data);
                    })
                    if (res.data.insertResult.insertedId) {
                        alert('payment successful')
                    }
                });
        }

    }
    return (
        <div>
            <form className="m-8" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError}</p>
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </div>
    );
};

export default CheckOut;