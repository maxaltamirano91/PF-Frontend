import axios from 'axios'
import {
	FETCH_META_DATA_REQUEST,
	FETCH_META_DATA_SUCCESS,
	FETCH_META_DATA_FAILURE,
	DOWNLOAD_EXCEL_REQUEST,
	DOWNLOAD_EXCEL_SUCCESS,
	DOWNLOAD_EXCEL_FAILURE,
	FETCH_PDF_SUCCESS,
	FETCH_PDF_FAILURE,
	CLEAR_PDF_URL,
    CLEAR_EXCEL_URL,
} from '../types/dataTypes'

export const fetchMetaData = () => async (dispatch) => {
	dispatch({ type: FETCH_META_DATA_REQUEST })
	try {
		const response = await axios.get('/metadata/data')
		dispatch({ type: FETCH_META_DATA_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: FETCH_META_DATA_FAILURE, payload: error.message })
	}
}

export const downloadExcelRequest = () => ({
	type: DOWNLOAD_EXCEL_REQUEST,
})

export const downloadExcelSuccess = (url) => ({
	type: DOWNLOAD_EXCEL_SUCCESS,
	payload: url,
})

export const downloadExcelFailure = (error) => ({
	type: DOWNLOAD_EXCEL_FAILURE,
	payload: error,
})

export const downloadExcel = () => async (dispatch) => {
	dispatch(downloadExcelRequest())
	try {
		const response = await axios.get('/metadata/exel', { responseType: 'blob' })
		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		const url = window.URL.createObjectURL(blob)

		// Guardar la URL en el store
		dispatch(downloadExcelSuccess(url))
	} catch (error) {
		dispatch(downloadExcelFailure(error.message))
	}
}

export const fetchPdf = () => async (dispatch) => {
  try {
    const response = await axios.get('/metadata/pdf', {
      responseType: 'blob', // Importante para recibir datos binarios
    });

    if (response.status !== 200) {
      throw new Error('Network response was not ok.');
    }

    // Crear un Blob con el tipo de contenido adecuado
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Crear una URL para el Blob
    const url = window.URL.createObjectURL(blob);

    // Despachar la acción con la URL del Blob
    dispatch({ type: FETCH_PDF_SUCCESS, payload: url });
  } catch (error) {
    dispatch({ type: FETCH_PDF_FAILURE, payload: error.message });
  }
};

export const clearPdfUrl = () => ({
	type: CLEAR_PDF_URL,
})

export const clearExcelUrl = () => ({
	type: CLEAR_EXCEL_URL,
})
