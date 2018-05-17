import React, {Component} from 'react';

import {
  createBottomTabNavigator,
} from 'react-navigation';

import {
  Text,
  View,
  Image,
} from 'react-native';

import HomePage from './HomePage.js';

import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Module RCTImageLoader requires main queue setup'])

export default createBottomTabNavigator({
  '首页': HomePage,
  '我的': HomePage,
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
       return <Image source={require('./source/tab_client_nor.png')}/>
     },
     tabBarVisible: navigation.state.index === 0,
    })
});
