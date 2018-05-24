import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native'
import {
  createStackNavigator,
} from 'react-navigation'
import {DetailsScreen} from './HomeScreen'

const RootStack = createStackNavigator({
  Details: DetailsScreen,
}, {
  initialRouteName: 'Details',
  navigationOptions: {
    headerBackImage: (
      <View style={{padding:17, width:40, }}>
        <Image source={require('./source/icon_back.png')}/>
      </View>
    ),
    headerBackTitle: null
  },
  mode:'card',
  headerMode:'screen',
});

export default class MyPage extends React.Component {
  static router = RootStack.router;
  render() {
    return (
      <RootStack navigation={this.props.navigation} />
    )
  }
}

const styles = StyleSheet.create({
  text: {
    alignItems:'center'
  }
})
