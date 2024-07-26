import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPreference } from '../../redux/actions'
import PaymentButton from '../../components/payment-button/PaymentButton'

const SubscriptionPage = () => {
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.auth)
	const { preferenceId } = useSelector((state) => state.subscription)

	const displayProduct = {
		title: 'Premium',
		quantity: 1,
		unit_price: 40,
		discount: 99,
	}

	const subtotal = displayProduct?.unit_price
	const discountAmount =
		(displayProduct?.unit_price * displayProduct?.discount) / 100
	const total = subtotal - discountAmount

	const product = {
		title: 'Premium',
		quantity: 1,
		unit_price: total,
	}

	useEffect(() => {
		dispatch(createPreference(product, token))
	}, [dispatch])

	const amounts = [
		{ label: 'Subtotal', value: subtotal },
		{
			label: `Descuento (${displayProduct?.discount}%)`,
			value: -discountAmount,
		},
	]

	return (
		<div className="w-100 h-100 m-0 row">
			<div className="p-5 col-8 d-flex align-items-center"></div>
			<div className="p-5 border col-4 d-flex align-items-center">
				<div className="w-100 p-5">
					<h3 className="mb-5">Orden de compra</h3>
					<div className="text-secondary">
						{amounts.map((amount, index) => (
							<div key={index} className="py-3 d-flex justify-content-between">
								<span>{amount.label}</span>
								<span>$ {amount.value}</span>
							</div>
						))}
					</div>
					<hr className="my-4" />
					<div className="mb-5 fs-3 d-flex justify-content-between">
						<span>Total</span>
						<span>${total}</span>
					</div>
					<div>
						{preferenceId ? (
							<PaymentButton preferenceId={preferenceId} />
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
