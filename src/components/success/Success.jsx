import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Error = () => {
	const { fetchSuccess } = useSelector((state) => state.requests)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (fetchSuccess) setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
		}, 8000)
		return () => clearTimeout(timer)
	}, [fetchSuccess])

	if (!visible) {
		return null
	}

	return (
		fetchSuccess && (
			<div
				style={{
					boxSizing: 'border-box',
					minWidth: '20vw',
					padding: '1rem 2rem',
					margin: 'auto',
					color: 'black',
					outline: 'solid 1.5px rgba(95, 196, 136, 0.836)',
					borderRadius: '0.5rem',
					background: 'rgba(231, 248, 233, 0.863)',
					position: 'fixed',
					bottom: '4vh',
					right: '2vw',
					zIndex: 100,
				}}
			>
				<p style={{ margin: 0 }}>{fetchSuccess}</p>
			</div>
		)
	)
}

export default Error
