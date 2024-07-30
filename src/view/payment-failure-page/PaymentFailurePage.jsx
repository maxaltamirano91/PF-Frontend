import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { sendPaymentNotification } from '../../redux/actions/paymentActions';

import styles from './PaymentFailurePage.module.css'; 

const PaymentFailurePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showToast, setShowToast] = useState(true);
  const loggedUser = useSelector((state) => state.auth.loggedUser)

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentData = {
      external_reference: query.get('external_reference'),
      payment_id: query.get('payment_id'),
      status: query.get('status'),
      email:loggedUser.email,
    };

    dispatch(sendPaymentNotification(paymentData));
  }, [dispatch, location]);

  return (
    <div className={styles.container}>
      {showToast && (
        <div className={`${styles.toast} toast show`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`${styles.toastHeader} toast-header`}>
            <strong className="me-auto">Fallo el Pago</strong>
            <small>Justo ahora</small>
            <Link to="/subscription">
              <button
                type="button"
                className={`btn-close ${styles.closeButton}`}
                aria-label="Close"
                onClick={() => setShowToast(false)}
              ></button>
            </Link>
          </div>
          <div className={`${styles.toastBody} toast-body`}>
            Lo siento, hubo un inconveniente con el pago. Intente nuevamente.
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentFailurePage;