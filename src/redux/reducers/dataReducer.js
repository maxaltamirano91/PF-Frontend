import {
	FETCH_META_DATA_REQUEST,
	FETCH_META_DATA_SUCCESS,
	FETCH_META_DATA_FAILURE,
	DOWNLOAD_EXCEL_REQUEST,
	DOWNLOAD_EXCEL_SUCCESS,
	DOWNLOAD_EXCEL_FAILURE,
	FETCH_PDF_REQUEST,
	FETCH_PDF_SUCCESS,
	FETCH_PDF_FAILURE,
	CLEAR_PDF_URL,
    CLEAR_EXCEL_URL,
} from '../types/dataTypes'

const initialState = {
    metaData: {
      userCount: 0,
      projectsCount: 0,
      roundedAveragePrice: 0,
      likeCount: 0,
      reviewCount: 0,
      socialMediaCount: 0,
    },
    excelUrl: null,
    loading: false,
    excelLoading: false,
    error: null,
    excelError: null,
    pdfUrl: null,
  }

  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_META_DATA_REQUEST:
        return { ...state, loading: true }
      case FETCH_META_DATA_SUCCESS:
        return { ...state, loading: false, metaData: action.payload }
      case FETCH_META_DATA_FAILURE:
        return { ...state, loading: false, error: action.payload }
      case DOWNLOAD_EXCEL_REQUEST:
        return { ...state, excelLoading: true }
      case DOWNLOAD_EXCEL_SUCCESS:
        return { ...state, excelLoading: false, excelUrl: action.payload }
      case DOWNLOAD_EXCEL_FAILURE:
        return { ...state, excelLoading: false, excelError: action.payload }
      case FETCH_PDF_REQUEST:
        return { ...state, loading: true }
      case FETCH_PDF_SUCCESS:
        return { ...state, loading: false, pdfUrl: action.payload }
      case FETCH_PDF_FAILURE:
        return { ...state, loading: false, error: action.payload }
      case CLEAR_PDF_URL:
        return { ...state, pdfUrl: null }
      case CLEAR_EXCEL_URL: 
        return { ...state, excelUrl: null }
      default:
        return state
    }
  }
  
  export default dataReducer
