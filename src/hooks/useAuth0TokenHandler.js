import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/actions'
import { FETCH_ERROR } from '../redux/types'
import { useAuth0 } from '@auth0/auth0-react'

const generatePassword = (length) => {
	const charset =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?/-='
	let password = ''
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length)
		password += charset[randomIndex]
	}
	return password
}

const useAuth0TokenHandler = () => {
	const dispatch = useDispatch()
	const { user, isAuthenticated, error, isLoading } = useAuth0()

	const userData = {
		userName: user?.nickname.split(' ').join('_'),
		email: `${user?.nickname.toLowerCase().split(' ').join('')}@gmail.com`,
		password: generatePassword(12),
		image: user?.picture,
	}

	useEffect(() => {
		if (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: `Error en la autenticación: ${error.message}`,
			})
			return
		}
		if (isLoading) return
		if (isAuthenticated) dispatch(loginUser(userData, 'auth0'))
		else
			dispatch({
				type: FETCH_ERROR,
				payload: 'No se pudo autentificar el usuario',
			})
	}, [isAuthenticated, dispatch, error, isLoading])
	return null
}

export default useAuth0TokenHandler
