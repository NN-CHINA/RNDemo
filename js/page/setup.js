import React, {Component} from 'react';

import {
  createBottomTabNavigator,
} from 'react-navigation';

import {
  Text,
  View,
  Image,
} from 'react-native';

import HomePage from './HomePage';
import MyPage from './MyPage'


import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Module RCTImageLoader requires main queue setup'])

const Title = {
  'HomePage' : '首页',
  'PointShop' : '积分商城',
  'Mine' : '我的',
}

export default createBottomTabNavigator({
  'HomePage': HomePage,
  'PointShop': MyPage,
  'Mine': MyPage,
},//RouteConfigs
{
  initialRouteName:'HomePage',//初始路由
  order:['HomePage','Mine','PointShop'],
  // paths:{'首页': HomePage},不知所云
  // backBehavior:'none',
  // tabBarComponent:(
  //   (tabBar) => (
  //      <View styles={{height:44, width:320, backgroundColor:'#f00'}} />
  //   )
  // ),//自定义tabBarUI
  tabBarOptions: {
    activeTintColor: '#ff6c15',
    activeBackgroundColor: '#fff',
    inactiveTintColor: '#888',
    inactiveBackgroundColor: '#FFF',
    showLabel: true,
    style:{
      backgroundColor:'#fff',
      height:50,
    },
    labelStyle:{
      fontSize:10
    },
    tabStyle:{
    },
    allowFontScaling: true,//当设置了labelStyle的fontSize时，无效
  },
  navigationOptions: ({ navigation }) => ({
    // title:'NN',//通用标题
     tabBarIcon: ({focused, tintColor}) => {
       const { routeName } = navigation.state;
       let icon;
       if (routeName === 'HomePage') {
         icon = focused ? require('./source/tab_home_sel.png') : require('./source/tab_home_nor.png');
       } else if (routeName === 'Mine') {
         icon = focused ? require('./source/tab_client_sel.png') : require('./source/tab_client_nor.png');
       } else if (routeName === 'PointShop') {
         icon = focused ? require('./source/tab_mall_sel.png') : require('./source/tab_mall_nor.png');
       }
       return <Image source={icon}/>
     },
     tabBarLabel: ({focused, tintColor}) => {
       const { routeName } = navigation.state;
       const name = Title[routeName];
       return <Text style={{color:tintColor}}>{name}</Text>
     },
     tabBarOnPress:((onPress) => {
       // console.log(onPress);
     }),
     tabBarVisible: navigation.state.index === 0,
   }),
});
