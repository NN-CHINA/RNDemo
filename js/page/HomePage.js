import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import {
  createStackNavigator,
} from 'react-navigation'
import HomeScreen, {DetailsScreen} from './HomeScreen'

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerBackImage: (
      <View style={{padding:10, width:40, }}>
        <Image source={require('./source/icon_back.png')}/>
      </View>
    ),
    headerBackTitle: null
  },
  mode:'card',
  headerMode:'screen',
});

export default class HomePage extends React.Component {
  static router = RootStack.router;

  componentWillUnmount() {

  }
  render() {
    return (
      <RootStack navigation={this.props.navigation} />
    )
  }
}
