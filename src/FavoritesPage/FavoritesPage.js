import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import FavoritesPageActions from './FavoritesPageActions'
import AsyncStorage from '@react-native-community/async-storage'
import styles from '../styles'
import MenuPage from '../MenuPage/MenuPage'
import MenuPageActions from '../MenuPage/MenuPageActions'
import LinearGradient from 'react-native-linear-gradient'

const mapStateToProps = ({ MenuPage, FavoritesPage }) => {
  return {
    favListInfo: FavoritesPage.favListInfo,
    favList: FavoritesPage.favList,
    favLoading: FavoritesPage.favLoading,
    weather: MenuPage.weather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      FavoritesPageActions: bindActionCreators(FavoritesPageActions, dispatch),
      MenuPageActions: bindActionCreators(MenuPageActions, dispatch)
    }
  }
}

class FavoritesPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Herolo Weather',
    headerStyle: {
      backgroundColor: '#6A5ACD'
    },
    headerTitleStyle: {
      fontSize: 25,
      left: 30,
      color: '#ffffff'
    },
    headerRight: (
      <Button
        onPress={() => navigation.navigate('MenuPage')}
        title="MENU"
        style={styles.titleNavigation}
        color="#000000"
      />
    ),
    headerLeft: <Image source={require('../images/weather2.png')} style={styles.weather} />
  })

  async componentDidMount() {
    await this.getFavList()
  }

  displayFavCities(cityInfo, i) {
    const { favListInfo } = this.props
    const city = JSON.parse(cityInfo)
    return (
      <View key={city.Key}>
        <TouchableOpacity
          onPress={async () => {
            const { navigation } = this.props
            const { handleAutoSearchData, handleWeatherData } = this.props.actions.MenuPageActions
            await handleAutoSearchData([city])
            await handleWeatherData([favListInfo[i][0]])
            navigation.navigate('MenuPage')
          }}
        >
          <ScrollView>
            <Text style={styles.ContentFavoriteName}>{city.LocalizedName}</Text>
            <Text style={styles.ContentFavorite}>
              {favListInfo[i][0].Temperature.Metric.Value + 'º'}
            </Text>
            <Text style={styles.ContentFavorite}>{favListInfo[i][0].WeatherText}</Text>
          </ScrollView>
        </TouchableOpacity>
      </View>
    )
  }

  componentDidUpdate() {
    const { updateFavInfoList, handleFavLoading } = this.props.actions.FavoritesPageActions
    const { favListInfo, favList } = this.props
    if (this.props.navigation.state.routeName === 'FavoritesPage') {
      if (favList.length === favListInfo.length && favList.length !== 0) {
        handleFavLoading(false)
      } else {
        handleFavLoading(true)
        if (favList.length > favListInfo.length) {
          favList.forEach(async i => {
            j = JSON.parse(i)
            await updateFavInfoList(favListInfo, j.Key)
          })
        }
      }
    }
  }

  async getFavList() {
    const { updateFavList } = this.props.actions.FavoritesPageActions
    const favCities = []
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const allLocations = await AsyncStorage.multiGet(allKeys)
      await allLocations.forEach(async favLoc => {
        await favCities.push(favLoc[1])
      })
      await updateFavList(favCities)
    } catch (err) {
      throw new Error(err)
    }
  }

  renderFav() {
    const { favList } = this.props
    return (
      <View>
        {favList && (
          <View>
            <ScrollView>
              <View>{favList.map((cityInfo, i) => this.displayFavCities(cityInfo, i))}</View>
            </ScrollView>
          </View>
        )}
      </View>
    )
  }

  renderLoading() {
    return (
      <View>
        <Image style={styles.loading} source={require('../images/load.gif')} />
      </View>
    )
  }

  render() {
    const { favLoading } = this.props
    const { favList, favListInfo } = this.props
    const { handleFavLoading } = this.props.actions.FavoritesPageActions
    if (favList.length === 0 || favListInfo.length === 0 || favList.length !== favListInfo.length) {
      handleFavLoading(true)
    }

    return (
      <View>
        <LinearGradient colors={['#ffffff', '#6A5ACD']} style={styles.backgroundGradient}>
          {favLoading ? this.renderLoading() : this.renderFav()}
        </LinearGradient>
      </View>
    )
  }
}

FavoritesPage.propTypes = {
  navigation: PropTypes.object,
  handleFavLoading: PropTypes.func,
  updateFavList: PropTypes.func,
  favList: PropTypes.array,
  favListInfo: PropTypes.array,
  favLoading: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesPage, MenuPage)
