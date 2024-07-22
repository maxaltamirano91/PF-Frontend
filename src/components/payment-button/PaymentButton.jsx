import { useEffect } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { MP_TEST_PUBLIC_KEY } from '../../../auth0-config'

const PaymentButton = ({ preferenceId }) => {
	useEffect(() => {
		initMercadoPago(MP_TEST_PUBLIC_KEY, {
			locale: 'es-AR',
		})
	}, [])

	return (
		<div>
			{preferenceId && (
				<Wallet
					initialization={{ preferenceId }}
					customization={{ texts: { valueProp: 'smart_option' } }}
				/>
			)}
		</div>
	)
}

export default PaymentButton
