import React, {Component} from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'

import moment from 'moment'
import 'moment/locale/pt-br'

import Task from '../components/Task'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'
import AddTask from './AddTask'
import {server, showError} from '../common'
import Axios from 'axios'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
}

export default class TaskList extends Component {
  state = {
    ...initialState,
  }

  // life cycle
  componentDidMount = async () => {
    let state = await AsyncStorage.getItem('state')
    state = JSON.parse(state) || initialState
    this.setState(
      {
        showDoneTasks: state.showDoneTasks,
      },
      this.filterTasks,
    )

    this.loadTasks()
  }

  loadTasks = async () => {
    try {
      const maxDate = moment()
        .add({day: this.props.daysAhead})
        .format('YYYY-MM-DD 23:59:59')
      const res = await Axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({tasks: res.data}, this.filterTasks)
    } catch (e) {
      showError(e)
    }
  }

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      visibleTasks = this.state.tasks.filter(task => !task.doneAt)
    }

    this.setState({visibleTasks})
    AsyncStorage.setItem(
      'state',
      JSON.stringify({
        showDoneTasks: this.state.showDoneTasks,
      }),
    )
  }

  toggleTask = async (taskId, doneAt) => {
    try {
      if (doneAt) {
        await Axios.delete(`${server}/tasks/${taskId}/done`)
      } else {
        await Axios.put(`${server}/tasks/${taskId}/done`)
      }
    } catch (e) {
      showError(e)
    }

    this.loadTasks()
  }

  addTask = async task => {
    if (!task.desc || !task.desc.trim()) {
      Alert.alert('Dados inválidos', 'Descrição não informada.')
      return
    }

    try {
      await Axios.post(`${server}/tasks`, {
        desc: task.desc,
        estimateAt: task.date,
      })
    } catch (e) {
      showError(e)
    }

    this.setState({showAddTask: false}, this.loadTasks)
  }

  deleteTask = async taskId => {
    try {
      await Axios.delete(`${server}/tasks/${taskId}`)
      this.loadTasks()
    } catch (e) {
      showError(e)
    }
  }

  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.addTask}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="bars"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task
                {...item}
                onToggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.setState({showAddTask: true})}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
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
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
