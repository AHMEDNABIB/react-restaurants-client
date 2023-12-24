import React from 'react';
import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useCart from '../../../hooks/useCart';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);




const Payment = () => {
    
	const [cart] = useCart();

    const total = cart.reduce((total, item) => total + item.price, 0);
    const price = parseFloat(total.toFixed(2))
     console.log(price)
    return (
        <div className='w-full'>
            <SectionTitle subHeading="please process" heading="Payment"></SectionTitle>

            <Elements stripe={stripePromise}>
                <CheckoutForm price={ price } />
            </Elements>
        </div>
    );
};

export default Payment;