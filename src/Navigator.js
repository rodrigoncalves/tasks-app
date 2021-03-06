import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'

import Login from './screens/Login'
import TaskList from './screens/TaskList'

import LoginOrHome from './screens/LoginOrHome'
import Menu from './screens/Menu'
import commonStyles from './commonStyles'

const menuConfig = {
  intialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      color: '#080',
      fontWeight: 'bold',
    },
  },
}

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title="Hoje" daysAhead={0} {...props} />,
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title="Amanhã" daysAhead={1} {...props} />,
    navigationOptions: {
      title: 'Amanhã',
    },
  },
  Week: {
    name: 'Week',
    screen: props => <TaskList title="Semana" daysAhead={7} {...props} />,
    navigationOptions: {
      title: 'Semana',
    },
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList title="Mês" daysAhead={30} {...props} />,
    navigationOptions: {
      title: 'Mês',
    },
  },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
  Loading: {
    name: 'LoginOrHome',
    screen: LoginOrHome,
  },
  Login: {
    name: 'Login',
    screen: Login,
  },
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Loading',
})

export default createAppContainer(mainNavigator)
