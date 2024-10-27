import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { appContext } from '../context/AppContext';

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    handler: (response: RazorpayResponse) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => {
            open: () => void;
        };
    }
}




const BuyCredit: React.FC = () => {
    const context = useContext(appContext);

    if (!context) {
        throw new Error("Provide within context");
    }




    const initPay = (amount: number) => {
        const options: RazorpayOptions = {
            key: 'rzp_test_123', // Replace with your test key
            amount: amount * 100, // Amount is in smallest currency unit (e.g., paise for INR)
            currency: 'INR',
            name: 'Credit App',
            description: 'Credit Plan',
            image: assets.logo,
            handler: (response: RazorpayResponse) => {
                console.log(response);
                // Optionally reload credits data or navigate after successful payment
                // loadCreditsData();
                // navigate('/dashboard');
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        console.log('Initialized Razorpay with:', options);
    };

    const handlePayment = (price: number) => {
        initPay(price);
    };

    return (
        <div className='min-h-[90vh] text-center pt-14 mb-6'>

<div className="bg-red-200 text-red-900 p-4 rounded-md mb-6 font-semibold">
                ⚠️ Note: This payment integration is currently in testing mode and will not process real transactions. This functionality is not yet available.
            </div>

            <button className='border border-gray-400 px-10 py-2 rounded-full'>Our Plans</button>
            <h1 className='text-2xl text-center md:text-3xl lg:text-4xl mt-6 mb-3 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>
                Choose the plan that's right for you
            </h1>
            <div className='flex flex-wrap items-center justify-center gap-6 text-left'>
                {plans.map((item, index) => (
                    <div key={index} className='bg-white rounded-lg drop-shadow-sm border py-12 px-8 p-6 text-gray-600 hover:scale-105 transition-all duration-700'>
                        <img src={assets.logo_icon} alt="logo" width={40} />
                        <p className='font-semibold mt-3'>{item.id}</p>
                        <p className='text-sm'>{item.desc}</p>
                        <p className='mt-3'>
                            <span className='text-3xl font-medium'>${item.price}</span>/{item.credits} credits
                        </p>
                        <button 
                            onClick={() => handlePayment(item.price)} 
                            className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
                        >
                            Get started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyCredit;
