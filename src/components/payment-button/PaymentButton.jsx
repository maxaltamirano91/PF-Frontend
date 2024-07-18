import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const PaymentButton = ({ preferenceId }) => {
  useEffect(() => {
    initMercadoPago('TEST-bfb5f681-fd31-4952-899b-11754a619f1c', {
      locale: 'es-AR',
    });
  }, []);

  return (
    <div>
      <Wallet 
        initialization={{ preferenceId: preferenceId }} 
        customization={{ texts: { valueProp: 'smart_option' }}} 
      />
    </div>
  );
};

export default PaymentButton;
