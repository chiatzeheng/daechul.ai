"use client"

import React from 'react';

// This component could fetch real data in a production environment
export const usePaymentData = () => {
    // Mock data for the payment chart
    const paymentData = [
        { month: 'Jan', amount: 1000 },
        { month: 'Feb', amount: 1500 },
        { month: 'Mar', amount: 1200 },
        { month: 'Apr', amount: 1800 },
        { month: 'May', amount: 2000 },
        { month: 'Jun', amount: 1700 },
    ];

    return paymentData;
};

export default function PaymentData() {
    const data = usePaymentData();
    return (
        <pre>{JSON.stringify(data, null, 2)}</pre>
    );
}