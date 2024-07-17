import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/actions'
import { FETCH_ERROR } from '../redux/types'
import { AUTH0_AUDIENCE } from '../../auth0-config'

const useAuth0TokenHandler = () => {
	const dispatch = useDispatch()
	const { getAccessTokenSilently, isAuthenticated } = useAuth0()

	useEffect(() => {
		const getToken = async () => {
			if (isAuthenticated) {
				try {
					const token = await getAccessTokenSilently({
						audience: AUTH0_AUDIENCE,
					})
					localStorage.setItem('authToken', token)
					dispatch(loginUser(token, 'auth0'))
				} catch (error) {
					dispatch({ type: FETCH_ERROR, payload: error.message })
				}
			}
		}

		getToken()
	}, [isAuthenticated, getAccessTokenSilently, dispatch])
}

export default useAuth0TokenHandler
