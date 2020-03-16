import React, {Component} from 'react'
import {ImageBackground, Text, StyleSheet, View, Platform} from 'react-native'

import bgImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import {TouchableOpacity} from 'react-native-gesture-handler'
import LoginInput from '../components/LoginInput'
import Axios from 'axios'
import {server, showError, showSuccess} from '../common'

const initialState = {
  email: '',
  password: '',
  name: '',
  confirmPassword: '',
  registerPage: false,
}

export default class Login extends Component {
  state = {
    ...initialState,
  }

  signinOrSignup = () => {
    if (this.state.registerPage) {
      this.signUp()
    } else {
      this.signIn()
    }
  }

  signUp = async () => {
    try {
      await Axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      })

      showSuccess('Usuário cadastrado!')
      this.setState({...initialState})
    } catch (e) {
      showError(e)
    }
  }

  signIn = async () => {
    try {
      const res = await Axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password,
      })

      Axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`

      this.props.navigation.navigate('Home')
    } catch (e) {
      showError(e)
    }
  }

  render() {
    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if (this.state.registerPage) {
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.password === this.state.confirmPassword)
    }

    const validForm = validations.reduce((a, b) => a && b)

    return (
      <ImageBackground source={bgImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.form}>
          <Text style={styles.subtitle}>
            {this.state.registerPage
              ? 'Crie a sua conta'
              : 'Informe seus dados'}
          </Text>
          {this.state.registerPage && (
            <LoginInput
              icon="user"
              placeholder="Nome"
              value={this.state.name}
              style={styles.input}
              onChangeText={name => this.setState({name})}
            />
          )}
          <LoginInput
            icon="at"
            placeholder="E-mail"
            value={this.state.email}
            style={styles.input}
            onChangeText={email => this.setState({email})}
          />
          <LoginInput
            icon="lock"
            placeholder="Senha"
            value={this.state.password}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={password => this.setState({password})}
          />
          {this.state.registerPage && (
            <LoginInput
              icon="asterisk"
              placeholder="Confirmação de senha"
              value={this.state.confirmPassword}
              style={styles.input}
              secureTextEntry={true}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
            />
          )}
          <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
            <View
              style={[
                styles.button,
                validForm ? {} : {backgroundColor: '#8a8'},
              ]}>
              <Text style={styles.buttonText}>
                {this.state.registerPage ? 'Registrar' : 'Entrar '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() =>
            this.setState({registerPage: !this.state.registerPage})
          }>
          <Text style={styles.buttonText}>
            {this.state.registerPage
              ? 'Já possuo uma conta'
              : 'Ainda não possui conta?'}
          </Text>
        </TouchableOpacity>
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
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
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
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
  },
})
