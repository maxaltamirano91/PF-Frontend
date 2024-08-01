import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createPreference,
	createStripePreference,
} from '../../redux/actions/subscriptionActions'
import PaymentButton from '../../components/payment-button/PaymentButton'
import StripePaymentButton from '../../components/payment-button/StripePaymentButton'
import styles from './subscriptionPage.module.css'

const SubscriptionPage = () => {
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.auth)
	const { preferenceId, stripeUrl } = useSelector((state) => state.subscription)

	const displayProduct = {
		title: 'Premium',
		quantity: 1,
		unit_price: 1500,
		discount: 10,
	}

	const subtotal = displayProduct?.unit_price
	const discountAmount =
		(displayProduct?.unit_price * displayProduct?.discount) / 100
	const total = subtotal - discountAmount

	const product = useMemo(
		() => ({
			title: 'Premium',
			quantity: 1,
			unit_price: total,
		}),
		[total]
	)

	useEffect(() => {
		if (!preferenceId) {
			dispatch(createPreference(product, token))
		}
		if (!stripeUrl) {
			dispatch(createStripePreference(product, token))
		}
	}, [dispatch, token, preferenceId, stripeUrl, product])

	const amounts = [
		{ label: 'Subtotal', value: subtotal },
		{
			label: `Descuento (${displayProduct?.discount}%)`,
			value: -discountAmount,
		},
	]

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.header}>
					<h3>Orden de compra</h3>
				</div>
				<div className={styles.amounts}>
					{amounts.map((amount, index) => (
						<div key={index} className={styles.amountRow}>
							<span>{amount.label}</span>
							<span>$ {amount.value}</span>
						</div>
					))}
				</div>
				<hr className="my-4" />
				<div className={styles.total}>
					<span>Total</span>
					<span>${total}</span>
				</div>
				<div className={styles.cardPaymentMethods}>
					<div>
						{preferenceId ? (
							<PaymentButton preferenceId={preferenceId} />
						) : (
							<p>Cargando opciones de pago...</p>
						)}
					</div>
					<div>
						{stripeUrl ? (
							<StripePaymentButton stripeUrl={stripeUrl} />
						) : (
							<p>Cargando opciones de pago...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SubscriptionPage
