import MenuPage from './src/MenuPage/MenuPage'
import FavoritesPage from './src/FavoritesPage/FavoritesPage'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const MainNavigator = createStackNavigator(
  {
    MenuPage: { screen: MenuPage },
    FavoritesPage: { screen: FavoritesPage }
  },
  {
    initialRouteName: 'MenuPage'
  }
)

const App = createAppContainer(MainNavigator)

export default App
