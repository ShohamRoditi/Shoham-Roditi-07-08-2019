import { combineReducers } from 'redux'
import MenuPageReducer from './MenuPage/MenuPageReducer'
import FavoritesPageReducer from './FavoritesPage/FavoritesPageReducer'

export default combineReducers({
  MenuPage: MenuPageReducer,
  FavoritesPage: FavoritesPageReducer
})
