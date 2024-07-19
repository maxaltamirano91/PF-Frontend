import axios from 'axios';
import {
    FETCH_TECHNOLOGIES,
    FILTER_TECHNOLOGIES,
    FETCH_ERROR
} from "../types"

export const fetchTechnologies = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/technologies');
			dispatch({
				type: FETCH_TECHNOLOGIES,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_ERROR,
				payload: error.message,
			});
		}
	};
};

export const filterTechnologies = (filteredTechnologies) => {
	return (dispatch) => {
		dispatch({
			type: FILTER_TECHNOLOGIES,
			payload: filteredTechnologies,
		});
	};
};