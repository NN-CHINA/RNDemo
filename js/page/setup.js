import React, {Component} from 'react';
import {
  StackNavigator,
} from 'react-navigation'

import { createBottomTabNavigator } from 'react-navigation';

import {
  Text,
  View,
  Image,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import HomePage from './HomePage';

class MineScreen extends React.Component {
    render() {
      return (
        <Text>NN</Text>
      )
    }
}

class HomePage extends React.Component {
    render() {
      return(
        <View>
          <Text>MainScreen</Text>
        </View>
      );
    }
}

function tabBarImage(props) {
  let index = props.index
  if (index === 0) {
    return
  } else {

  }
}

export default createBottomTabNavigator({
  '首页': HomePage,
  '我的': MineScreen,
}, {
  tabBarOptions: {
    activeTintColor: '#F00',
    activeBackgroundColor: '#FF0',
    inactiveTintColor: '#888',
    inactiveBackgroundColor: '#FFF',
    showLabel: true,
    style:{
      backgroundColor:'#fff',
    },
    labelStyle:{
      fontSize:12
    },
    allowFontScaling: true,//当设置了labelStyle的fontSize时，无效
  },
  navigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, tintColor }) => {
       const { routeName } = navigation.state;
       let iconName;
       if (routeName === '首页') {
         iconName = 'ios-person'
       } else if (routeName === '我的') {
         iconName = 'ios-information-circle'
       }
       return <Ionicons name={iconName} size={30} color={tintColor}/>
     },
   }),
});
