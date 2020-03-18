import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'

export default class LoginOrHome extends Component {
  async componentDidMount() {
    let userData = await AsyncStorage.getItem('userData')
    try {
      userData = JSON.parse(userData)
    } catch (_) {
      userData = null
    }

    if (userData && userData.token) {
      Axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
      this.props.navigation.navigate('Home', userData)
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
})
