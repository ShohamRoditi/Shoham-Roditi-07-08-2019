import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../src/rootReducer'
import MenuPageActions from '../src/MenuPage/MenuPageActions'

const middleware = applyMiddleware(thunk)
const composedEnhancers = compose(middleware)
const initialState = {}

describe('MenuPageActions Testing', () => {
  test('handleAutoSearchData MenuPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(MenuPageActions.autoCompleteSearch()).toHaveProperty('type', 'AUTO_COMPLETE')
    expect(store.getState().MenuPage).toHaveProperty('autoCompleteSearchData', [])
    store.dispatch(
      MenuPageActions.handleAutoSearchData([
        {
          Version: 1,
          Key: '215854',
          Type: 'City',
          Rank: 31,
          LocalizedName: 'Tel Aviv',
          Country: {
            ID: 'IL',
            LocalizedName: 'Israel'
          },
          AdministrativeArea: {
            ID: 'TA',
            LocalizedName: 'Tel Aviv'
          }
        }
      ])
    )
    expect(store.getState().MenuPage).toHaveProperty('autoCompleteSearchData', [
      {
        Version: 1,
        Key: '215854',
        Type: 'City',
        Rank: 31,
        LocalizedName: 'Tel Aviv',
        Country: {
          ID: 'IL',
          LocalizedName: 'Israel'
        },
        AdministrativeArea: {
          ID: 'TA',
          LocalizedName: 'Tel Aviv'
        }
      }
    ])
  })

  test('handleWeatherData MenuPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(MenuPageActions.addWeather()).toHaveProperty('type', 'ADD_WEATHER')
    expect(store.getState().MenuPage).toHaveProperty('weather', [])
    store.dispatch(MenuPageActions.handleWeatherData([{ test: 'test' }]))
    expect(store.getState().MenuPage).toHaveProperty('weather', [{ test: 'test' }])
  })

  test('handleModalState MenuPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(MenuPageActions.updateModalState()).toHaveProperty('type', 'MODAL_STATE')
    expect(store.getState().MenuPage).toHaveProperty('modalState', false)
    store.dispatch(MenuPageActions.handleModalState(true))
    expect(store.getState().MenuPage).toHaveProperty('modalState', true)
  })

  test('handleMenuLoading MenuPageActions', () => {
    const store = createStore(rootReducer, initialState, composedEnhancers)
    expect(MenuPageActions.menuLoading()).toHaveProperty('type', 'MENU_LOADING')
    expect(store.getState().MenuPage).toHaveProperty('menuLoading', true)
    store.dispatch(MenuPageActions.handleMenuLoading(false))
    expect(store.getState().MenuPage).toHaveProperty('menuLoading', false)
  })
})
