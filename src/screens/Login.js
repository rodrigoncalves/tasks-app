import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet} from 'react-native'

import bgImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

export default class Login extends Component {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
})
