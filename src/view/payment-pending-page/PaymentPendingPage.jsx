import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sendPaymentNotification } from '../../redux/actions/paymentActions';
import { getUserProfile } from '../../redux/actions';

const PaymentPendingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const authToken=useSelector(state => state.auth.token)

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
      <h1>Pago pendiente!</h1>
      <p>Su pago esta siendo procesado...</p>
    </div>
  );
};

export default PaymentPendingPage;
