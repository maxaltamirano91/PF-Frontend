import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { sendPaymentNotification } from '../../redux/actions/paymentActions'
import { getUserProfile } from '../../redux/actions'
import styles from './PaymentPendingPage.module.css'

const PaymentPendingPage = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const authToken = useSelector((state) => state.auth.token)
	const [showToast, setShowToast] = useState(true)
	const loggedUser = useSelector((state) => state.auth.loggedUser)

	useEffect(() => {
		dispatch(getUserProfile(authToken))
		const query = new URLSearchParams(location.search)
		const paymentData = {
			external_reference: query.get('external_reference'),
			payment_id: query.get('payment_id'),
			status: query.get('status'),
			email:loggedUser.email,
		}

		dispatch(sendPaymentNotification(paymentData))
	}, [dispatch, location, authToken])

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
						<strong className="me-auto">Pago Pendiente</strong>
						<small>Justo ahora</small>
						<Link to="/home">
							<button
								type="button"
								className={`btn-close ${styles.closeButton}`}
								aria-label="Close"
								onClick={() => setShowToast(false)}
							></button>
						</Link>
					</div>
					<div className={`${styles.toastBody} toast-body`}>
						Su pago está siendo procesado. Por favor, espere un momento.
					</div>
				</div>
			)}
		</div>
	)
}

export default PaymentPendingPage
