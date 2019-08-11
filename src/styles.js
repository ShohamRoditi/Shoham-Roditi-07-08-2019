import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  favorite: {
    height: 35,
    width: 35,
    right: 12,
    top: 2
  },
  loading: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    top: 100
  },
  backgroundGradient: {
    width: '100%',
    height: '100%'
  },
  weather: {
    height: 40,
    width: 40,
    marginLeft: 20
  },
  localizedName: {
    color: '#333333',
    fontSize: 25,
    fontFamily: 'bold',
    marginLeft: 40,
    marginTop: 15
  },
  temperature: {
    color: '#333333',
    fontSize: 22,
    marginLeft: 40,
    marginTop: 10
  },
  weatherText: {
    color: '#4B0082',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 30
  },
  addToFavorites: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end'
  },
  addToFavoritesButton: {
    height: 70,
    width: 70,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 30
  },
  modal: {
    height: 230
  },
  contentModal: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5
  },
  okButton: {
    alignSelf: 'center',
    marginTop: 15
  },
  ContentFavoriteName: {
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 25,
    fontFamily: 'bold',
    marginBottom: 10,
    color: '#4B0082'
  },
  ContentFavorite: {
    alignSelf: 'center',
    fontSize: 22
  }
})

export default styles
