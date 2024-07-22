import { useEffect } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const PaymentButton = ({ preferenceId }) => {
	useEffect(() => {
		initMercadoPago('APP_USR-ed20d86e-e8ef-46b4-b53e-fa62adae6bc1', {
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
