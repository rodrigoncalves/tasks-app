import React, {Component} from 'react'
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  Platform,
  Alert,
} from 'react-native'

import bgImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import {TouchableOpacity} from 'react-native-gesture-handler'
import LoginInput from '../components/LoginInput'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    registerPage: false,
  }

  signinOrSignup = () => {
    if (this.state.registerPage) {
      Alert.alert('Sucesso', 'Criar conta')
    } else {
      Alert.alert('Sucesso', 'Logar')
    }
  }

  render() {
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
          <TouchableOpacity onPress={this.signinOrSignup}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.registerPage ? 'Registrar' : 'Entrar '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() =>
            this.setState({registerStage: !this.state.registerPage})
          }>
          <Text style={styles.buttonText}>
            {this.state.registerPage
              ? 'Já possuo uma conta'
              : 'Ainda não possuo conta'}
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
