import React, {Component} from 'react'
import {
  View,
  Image,
  StyleSheet,
} from 'react-native'

export default  class NoDataScreen extends React.Component {
  render() {
    return (
      <View style={styles.image}>
        <Image source={require('./source/empty.png')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  }
})
