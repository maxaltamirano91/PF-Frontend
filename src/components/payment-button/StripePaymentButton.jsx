import React from 'react';
import './StripePaymentButton.css';

const StripePaymentButton = ({ stripeUrl }) => {
  const handlePayment = () => {
    window.location.href = stripeUrl;
  };

  return (
    <button className="stripe-payment-button" onClick={handlePayment}>
      Pagar con Stripe
    </button>
  );
};

export default StripePaymentButton;
