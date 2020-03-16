import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Login from './screens/Login'
import TaskList from './screens/TaskList'

const mainRoutes = {
  Login: {
    name: 'Login',
    screen: Login,
  },
  Home: {
    name: 'Home',
    screen: TaskList,
  },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Login',
})

export default createAppContainer(mainNavigator)
