import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { sendPaymentNotification, sendStripePaymentNotification } from '../../redux/actions/paymentActions'
import { getUserProfile } from '../../redux/actions'
import styles from './PaymentSuccessPage.module.css'

const PaymentSuccessPage = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const authToken = useSelector((state) => state.auth.token)
	const [showToast, setShowToast] = useState(true)
	const loggedUser = useSelector((state) => state.auth.loggedUser)
	const [hasNotified, setHasNotified] = useState(false) // Estado adicional para evitar la notificación repetida

	useEffect(() => {
		if (!loggedUser || !authToken) return;

		// Solo realizar la notificación si no se ha hecho antes
		if (!hasNotified) {
			dispatch(getUserProfile(authToken));

			const query = new URLSearchParams(location.search);
			const session_id = query.get('session_id');

			if (session_id) {
				// Es un pago de Stripe
				const stripePaymentData = {
					session_id,
					email: loggedUser.email,
					user: loggedUser.id,
				};
				dispatch(sendStripePaymentNotification(stripePaymentData));
			} else {
				// Es un pago de MercadoPago
				const paymentData = {
					external_reference: query.get('external_reference'),
					payment_id: query.get('payment_id'),
					status: query.get('status'),
					email: loggedUser.email,
					user_id: loggedUser.id,
				};
				dispatch(sendPaymentNotification(paymentData));
			}

			setHasNotified(true); // Marcar que la notificación ha sido realizada
		}
	}, [dispatch, location.search, authToken, loggedUser, hasNotified]);

	return (
		<div className={styles.container}>
			{showToast && (
				<div
					className={`${styles.toast} toast show`}
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<div className={`${styles.toastHeader} toast-header`}>
						<strong className="me-auto">Pago Exitoso</strong>
						<small>Justo ahora</small>
						<Link to="/home">
							<button
								type="button"
								className={`btn-close ${styles.closeButton}`}
								data-bs-dismiss="toast"
								aria-label="Close"
								onClick={() => setShowToast(false)}
							></button>
						</Link>
					</div>
					<div className={`${styles.toastBody} toast-body`}>
						¡Muchas gracias por suscribirse! Empieza a disfrutar de nuestros
						servicios.
					</div>
				</div>
			)}
		</div>
	)
}

export default PaymentSuccessPage
