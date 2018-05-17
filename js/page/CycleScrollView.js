import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'
import Carousel from 'react-native-carousel'

export default class CycleScrollView extends React.Component {
  render() {
    return (
      <Carousel style={styles.carousel}>
        <View style={styles.container}>
          <Image source={require('./source/default_avatar.png')}/>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
      </Carousel>
    )
  }
}

var styles = StyleSheet.create({
  carousel: {
    height:200,
    width:320,
    backgroundColor:'#f00',
  },
  container: {
    width: 320,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0',
  },
});
