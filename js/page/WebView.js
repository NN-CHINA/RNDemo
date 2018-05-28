import React, {Component} from 'react'
import {
  WebView,
  StyleSheet,
  Button,
} from 'react-native'

export default class WebViewScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
      const {params} = navigation.state;

      return {
        title: params ? params.title : 'ZJHFZ',
        headerLeft: <Button title='🔙' onPress={(event) => {
          params.webView.webViewGoBack;
          // if (this.state.canGoBack) {
          //   this.refs['webView'].goBack();
          // } else {
          //   navigation.goBack();
          // }
        }}/>
      }
    }

    constructor(props) {
      super(props);
      this.state ={
        canGoBack:false,
      }
      this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
      this.webViewGoBack = this.webViewGoBack.bind(this);
      this.props.navigation.setParams({webView:this});
    }

    onNavigationStateChange(props) {
      console.log(props);
      this.setState({
        canGoBack:props.canGoBack,
      })
    }

    webViewGoBack() {
      console.log('NN');
    }

    render() {
      const {navigation} = this.props;
      const link = navigation.getParam('link', null);
      return (
        <WebView
          ref={'webView'}
          source={{uri:link}}
          style={styles.webView}
          onLoad={
            (event) => {
                console.log(event);
            }
          }
          onLoadEnd ={
            (event) => {
            }
          }
          onNavigationStateChange={
            this.onNavigationStateChange
            // (event) => {
            //   console.log(event);
            //   this.props.navigation.setParams({title: event.title})
            // }
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
