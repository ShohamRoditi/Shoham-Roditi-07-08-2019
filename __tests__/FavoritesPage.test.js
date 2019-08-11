import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../src/rootReducer'
import FavoritesPageActions from '../src/FavoritesPage/FavoritesPageActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('FavoritesPageActions Testing', () => {
  test('handleFavLoading FavoritesPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(FavoritesPageActions.favLoading()).toHaveProperty('type', 'FAV_LOADING')
    expect(store.getState().FavoritesPage).toHaveProperty('favLoading', true)
    store.dispatch(FavoritesPageActions.handleFavLoading(false))
    expect(store.getState().FavoritesPage).toHaveProperty('favLoading', false)
  })

  test('updateFavList FavoritesPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(FavoritesPageActions.addToFavList()).toHaveProperty('type', 'ADD_FAV_LIST')
    expect(store.getState().FavoritesPage).toHaveProperty('favList', [])
    store.dispatch(FavoritesPageActions.updateFavList([{ test: 'test' }]))
    expect(store.getState().FavoritesPage).toHaveProperty('favList', [{ test: 'test' }])
  })
})
