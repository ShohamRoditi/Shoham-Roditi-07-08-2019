import {
  MENU_LOADING,
  ADD_WEATHER,
  AUTO_COMPLETE,
  MODAL_STATE,
  DAILY_FORECASTS
} from './MenuPageActionTypes'

const initialState = {
  menuLoading: true,
  weather: [],
  dailyForecasts: [],
  autoCompleteSearchData: [],
  modalState: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_LOADING:
      return {
        ...state,
        menuLoading: action.data
      }
    case ADD_WEATHER:
      return {
        ...state,
        weather: action.data
      }
    case AUTO_COMPLETE:
      return {
        ...state,
        autoCompleteSearchData: action.data
      }
    case MODAL_STATE:
      return {
        ...state,
        modalState: action.data
      }
    case DAILY_FORECASTS:
      return {
        ...state,
        dailyForecasts: action.data
      }
    default:
      return state
  }
}
