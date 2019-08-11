import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, Button } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import MenuPageActions from './MenuPageActions'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../styles'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage'

const mapStateToProps = ({ MenuPage }) => {
  return {
    weather: MenuPage.weather,
    menuLoading: MenuPage.menuLoading,
    autoCompleteSearchData: MenuPage.autoCompleteSearchData,
    favKey: MenuPage.favKey,
    modalState: MenuPage.modalState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      MenuPageActions: bindActionCreators(MenuPageActions, dispatch)
    }
  }
}

class MenuPage extends Component {
  constructor(props) {
    super(props)

    this.handleSearchWeather = this.handleSearchWeather.bind(this)
    this.renderLoading = this.renderLoading.bind(this)
    this.renderWeather = this.renderWeather.bind(this)
    this.addRemoveToFavorites = this.addRemoveToFavorites.bind(this)
    this.checkInFavList = this.checkInFavList.bind(this)
  }

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
        onPress={() => navigation.navigate('FavoritesPage')}
        title="FAVORITES"
        color="#000000"
      />
    ),
    headerLeft: <Image source={require('../images/weather2.png')} style={styles.weather} />
  })

  state = {
    searchInput: '',
    inFavList: false
  }

  componentDidMount() {
    const { handleSearch } = this.props.actions.MenuPageActions
    handleSearch('tel aviv')
  }

  async handleSearchWeather() {
    const { handleSearch, handleMenuLoading, handleWeather } = this.props.actions.MenuPageActions

    handleMenuLoading(true)

    await handleSearch(this.state.searchInput)
    if (this.props.autoCompleteSearchData.length !== 0) {
      await handleWeather(this.props.autoCompleteSearchData[0].Key)
      this.checkInFavList()
    }
  }

  async addRemoveToFavorites(location) {
    if (this.state.inFavList) {
      try {
        await AsyncStorage.removeItem(location.Key)
      } catch (err) {
        throw new Error(err)
      }
    } else await AsyncStorage.setItem(`${location.Key}`, JSON.stringify(location))
    this.setState({ inFavList: !this.state.inFavList })
  }

  async checkInFavList() {
    const { autoCompleteSearchData } = this.props
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const allLocations = await AsyncStorage.multiGet(allKeys)
      this.setState({ inFavList: false })
      await allLocations.forEach(async favLoc => {
        if (autoCompleteSearchData[0].Key === favLoc[0]) {
          this.setState({ inFavList: true })
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  renderWeather() {
    const { weather, autoCompleteSearchData, modalState } = this.props
    const { handleModalState } = this.props.actions.MenuPageActions

    return (
      <View>
        {modalState ? (
          <View>
            <Modal isVisible={modalState}>
              <View style={styles.modal}>
                <LinearGradient colors={['#9cff9d', '#ffffff']} style={styles.backgroundGradient}>
                  <Text style={styles.contentModal}>The input isn&apos;t valid</Text>
                  <Text style={styles.contentModal}>Please, enter a specific city</Text>
                  <TouchableOpacity style={styles.okButton} onPress={() => handleModalState(false)}>
                    <Text>OK</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </Modal>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.addToFavoritesButton}
              onPress={() => this.addRemoveToFavorites(autoCompleteSearchData[0])}
            >
              {this.state.inFavList ? (
                <Image
                  style={styles.addToFavorites}
                  resizeMode="contain"
                  source={require('../images/unFavorites.png')}
                />
              ) : (
                <Image
                  style={styles.addToFavorites}
                  resizeMode="contain"
                  source={require('../images/addFavorites.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.localizedName}>{autoCompleteSearchData[0].LocalizedName}</Text>
            <Text style={styles.temperature}>{weather[0].Temperature.Metric.Value + 'º'}</Text>
            <Text style={styles.weatherText}>{weather[0].WeatherText}</Text>
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

  async componentDidUpdate(prevProps) {
    const { weather, autoCompleteSearchData } = this.props
    const { handleWeather, handleMenuLoading } = this.props.actions.MenuPageActions
    if (this.props.navigation.state.routeName === 'MenuPage') {
      if (prevProps !== this.props) {
        if (autoCompleteSearchData.length !== 0 && weather.length === 0) {
          handleWeather(autoCompleteSearchData[0].Key)
          this.checkInFavList()
        } else if (autoCompleteSearchData.length !== 0 && weather.length !== 0) {
          await handleMenuLoading(false)
          this.checkInFavList()
        }
      } else if (this.props.modalState === true) {
        this.forceUpdate()
      }
    }
  }

  render() {
    const { menuLoading } = this.props
    const searchInput = this.state.searchInput

    return (
      <View>
        <LinearGradient colors={['#ffffff', '#6A5ACD']} style={styles.backgroundGradient}>
          <SearchBar
            placeholder="Search"
            onChangeText={searchText => this.setState({ searchInput: searchText })}
            value={searchInput}
            onSubmitEditing={() => this.handleSearchWeather()}
          />
          {menuLoading ? this.renderLoading() : this.renderWeather()}
        </LinearGradient>
      </View>
    )
  }
}

MenuPage.propTypes = {
  navigation: PropTypes.object,
  autoCompleteSearchData: PropTypes.array,
  weather: PropTypes.arrayOf(PropTypes.object),
  handleWeather: PropTypes.func,
  handleSearch: PropTypes.func,
  handleMenuLoading: PropTypes.func,
  menuLoading: PropTypes.bool,
  modalState: PropTypes.bool,
  actions: PropTypes.objectOf(PropTypes.object)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPage)
