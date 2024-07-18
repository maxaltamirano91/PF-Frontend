import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sendPaymentNotification } from '../../redux/actions/paymentActions';

const PaymentFailurePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentData = {
        external_reference: query.get('external_reference'),
        payment_id: query.get('payment_id'),
        status: query.get('status'),
    };

    dispatch(sendPaymentNotification(paymentData));
  }, [dispatch, location]);

  return (
    <div>
      <h1>Fallo el pago!</h1>
      <p>Lo siento hubo un inconveniente con el pago intente nuevamente.</p>
    </div>
  );
};

export default PaymentFailurePage;
