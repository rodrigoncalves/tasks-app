import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet, View, Platform} from 'react-native'

import bgImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            onChangeText={password => this.setState({password})}
          />
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  form: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: Platform.OS === 'ios' ? 15 : 10,
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
  },
})
