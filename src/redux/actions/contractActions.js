import axios from 'axios'
import { CONTRACT_FORM, FETCH_ERROR } from '../types'

export const contractForm = (formData, token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('/contract', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            dispatch({
                type: CONTRACT_FORM,
                payload: data,
            })
        } catch (error) {
            return dispatch({
                type: FETCH_ERROR,
                payload: error.message
            })
        }
    }
}