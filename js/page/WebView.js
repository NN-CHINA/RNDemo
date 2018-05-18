import React, {Component} from 'react'
import {
  WebView,
  StyleSheet,
} from 'react-native'

export default class WebViewScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
      const {params} = navigation.state;
        console.log(params);
      return {
        title: params ? params.title : 'ZJHFZ'
      }
    }
  render() {
    const {navigation} = this.props;
    const link = navigation.getParam('link', null);
    return (
      <WebView
        source={{uri:link}}
        style={styles.webView}
        onLoad={
          (event) => {
              console.log(event);
          }
        }
        onNavigationStateChange={
          (event) => {
            console.log(event.title);
            this.props.navigation.setParams({title: event.title})
          }
        }
      />
    )
  }
}

var styles = StyleSheet.create({
  webView: {
    backgroundColor:'#DDD',
    height:350,
  }
})
