import {
  MENU_LOADING,
  ADD_WEATHER,
  AUTO_COMPLETE,
  MODAL_STATE,
  DAILY_FORECASTS
} from './MenuPageActionTypes'

import keyApi from '../../consts'

const menuLoading = data => ({ type: MENU_LOADING, data })
const addWeather = data => ({ type: ADD_WEATHER, data })
const autoCompleteSearch = data => ({ type: AUTO_COMPLETE, data })
const updateModalState = modalState => ({ type: MODAL_STATE, data: modalState })

const dailyForecasts = data => ({ type: DAILY_FORECASTS, data })

const handleAutoSearchData = data => async dispatch => {
  await dispatch(autoCompleteSearch(data))
}

const handleWeatherData = data => async dispatch => {
  await dispatch(addWeather(data))
}

const handleDailyForecasts = data => async dispatch => {
  await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data}?apikey=${keyApi}`)
    .then(res => res.json())
    .then(async data => {
      await dispatch(dailyForecasts(data))
    })
    .catch(err => {
      throw new Error(`"error": ${err}`)
    })
}

const handleModalState = modalState => async dispatch => {
  await dispatch(updateModalState(modalState))
}

const handleMenuLoading = load => async dispatch => {
  await dispatch(menuLoading(load))
}

const handleWeather = data => async dispatch => {
  await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${data}?apikey=${keyApi}&details=true`
  )
    .then(res => res.json())
    .then(async data => {
      await dispatch(addWeather(data))
    })
    .catch(err => {
      throw new Error(`"error": ${err}`)
    })
}

const handleSearch = data => async dispatch => {
  if (data === '') return
  await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${keyApi}&q=${data}`
  )
    .then(res => res.json())
    .then(async data => {
      if (data === [] || data === undefined || data === '' || data.length === 0) {
        await dispatch(updateModalState(true))
      } else if (data.length !== 0) {
        await dispatch(autoCompleteSearch(data))
      }
    })
    .catch(err => {
      throw new Error(`"error": ${err}`)
    })
}

export default {
  menuLoading,
  addWeather,
  autoCompleteSearch,
  updateModalState,
  handleMenuLoading,
  handleWeather,
  handleSearch,
  handleModalState,
  dailyForecasts,
  handleDailyForecasts,
  handleAutoSearchData,
  handleWeatherData
}
