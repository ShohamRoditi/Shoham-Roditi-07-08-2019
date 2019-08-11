import { ADD_FAV_LIST, INFO_FAV_LIST, FAV_LOADING } from './FavoritesPageActionTypes'
import keyApi from '../../consts'

const favLoading = data => ({ type: FAV_LOADING, data })

const handleFavLoading = load => async dispatch => {
  await dispatch(favLoading(load))
}

const addToFavList = location => ({ type: ADD_FAV_LIST, data: location })

const updateFavList = location => async dispatch => {
  await dispatch(addToFavList(location))
}

const addInfoToFavList = data => ({ type: INFO_FAV_LIST, data })

const updateFavInfoList = (prevFavInfo, data) => async dispatch => {
  newFavInfo = []
  prevFavInfo.forEach(locInfo => {
    newFavInfo.push(locInfo)
  })
  await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${data}?apikey=${keyApi}&details=true`
  )
    .then(res => res.json())
    .then(async data => {
      await newFavInfo.push(data)
      await dispatch(addInfoToFavList(newFavInfo))
    })
    .catch(err => {
      throw new Error(`"error": ${err}`)
    })
}

export default {
  handleFavLoading,
  favLoading,
  updateFavList,
  addToFavList,
  updateFavInfoList,
  addInfoToFavList
}
