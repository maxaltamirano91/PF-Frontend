import React, { useEffect } from 'react';

const PaymentButton = ({ preferenceId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const mp = new window.MercadoPago("TEST-bfb5f681-fd31-4952-899b-11754a619f1c", {
        locale: 'es-AR' 
      });

      mp.checkout({
        preference: {
          id: preferenceId
        },
        autoOpen: true 
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [preferenceId]);

  return (
    <div>
      <button id="checkout-btn">Pagar</button>
    </div>
  );
};


export default PaymentButton;
