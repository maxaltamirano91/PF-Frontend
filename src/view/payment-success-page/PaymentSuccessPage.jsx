import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sendPaymentNotification } from '../../redux/actions/paymentActions';
import { getUserProfile } from '../../redux/actions';

const PaymentSuccessPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const authToken = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(getUserProfile(authToken))
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
      <h1>Pago exitoso</h1>
      <p>Muchas gracias por subscribirse!</p>
    </div>
  );
};

export default PaymentSuccessPage;
