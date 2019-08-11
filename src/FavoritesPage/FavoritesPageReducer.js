import { ADD_FAV_LIST, INFO_FAV_LIST, FAV_LOADING } from './FavoritesPageActionTypes'
const initialState = {
  favList: [],
  favListInfo: [],
  favLoading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAV_LIST:
      return {
        ...state,
        favList: action.data
      }
    case INFO_FAV_LIST:
      return {
        ...state,
        favListInfo: action.data
      }
    case FAV_LOADING:
      return {
        ...state,
        favLoading: action.data
      }
    default:
      return state
  }
}
