import React, {Component} from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import commonStyles from '../commonStyles'

import DateTimePicker from '@react-native-community/datetimepicker'

const initialState = {desc: '', date: new Date()}

export default class AddTask extends Component {
  state = {...initialState}

  getDateTimePicker = () => {
    return (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date})}
        mode="date"
      />
    )
  }
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a descrição..."
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.button}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.getDateTimePicker()}
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  background: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
})
