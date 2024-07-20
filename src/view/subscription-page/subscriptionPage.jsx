import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, createPreference } from '../../redux/actions'
import MembershipProduct from '../../components/membership-product/MembershipProduct'
import PaymentButton from '../../components/payment-button/PaymentButton'

const SubscriptionPage = () => {
	const dispatch = useDispatch()
	const { loggedUser, token } = useSelector((state) => state.auth)
	const { preferenceId } = useSelector((state) => state.subscription)
	const { error } = useSelector((state) => state.requests)

	const product = {
		title: 'Premium',
		quantity: 1,
		unit_price: 1,
		id: loggedUser?.id,
	}

	useEffect(() => {
		dispatch(getUserProfile(token))
	}, [dispatch, token])

	useEffect(() => {
		if (loggedUser) {
			dispatch(createPreference(product))
		}
	}, [dispatch, loggedUser])

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h5 className="card-title text-center">
								Compra Membresía Premium
							</h5>
							<form>{product && <MembershipProduct product={product} />}</form>
							{preferenceId && (
								<div className="mt-3">
									<PaymentButton preferenceId={preferenceId} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SubscriptionPage
