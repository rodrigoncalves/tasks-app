import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet} from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background} />
        <Text style={styles.taskList}>Text List</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
})
