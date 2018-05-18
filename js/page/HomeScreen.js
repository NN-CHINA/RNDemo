import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StatusBar,
  Dimensions,
  WebView,
} from 'react-native'
import CycleScrollView from './CycleScrollView'
import WebViewScreen from './WebView'

var deviceWidth = Dimensions.get('window').width;

//navigate and push accept an optional second argument
//to let you pass parameters to the route you are navigating to
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'首页',
    headerStyle: {
      backgroundColor: '#f00'
    },
    headerTintColor: '#00f',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft:(
      <Button
        title='筛选'
        onPress={() => alert('Filter City!')}
        color='white'
      />
    )
  }

  constructor(props){
    super(props)
    this.state={
      load:false,
      dataSource:null
    }
    this.accessCycleScrollViewDetail = this.accessCycleScrollViewDetail.bind(this);
  }

  accessCycleScrollViewDetail(props) {
    const type = props.type;
    switch (type) {
      case 1: {
        this.props.navigation.push('Web', {link: props.link_url});
      }

        break;
      default:

    }
  }

  render() {
    return (
      <View style={{
        height:deviceWidth * 9 / 16
      }}>
        <CycleScrollView adList={this.state.dataSource} onClick={this.accessCycleScrollViewDetail}/>
      </View>
    );
  }

  //执行耗时操作
  componentDidMount() {
    this.getData();
  }
  //取消任何未完成的请求
  componentWillUnmount() {

  }
  //网络请求
  getData() {
    const timeStamp = Date.parse(new Date()) / 1000;
    const timeStampString = timeStamp.toString();
    const lastFour = timeStampString.substring(timeStampString.length - 4);
    const forge = require('node-forge');
    const lastFourBase64 = forge.util.encode64(lastFour);
    const noEqualSignLastFour = lastFourBase64.replace(/=/g, '');
    const lastFourForNoEqualSignLastFour = noEqualSignLastFour.substring(noEqualSignLastFour.length - 4);
    const willBeEncodedString = lastFour + 'zhianCode' + lastFourForNoEqualSignLastFour;
    var md5 = forge.md.md5.create();
    md5.update(willBeEncodedString);
    const authcode = md5.digest().toHex();
    fetch('http://zhutou.zhianinvest.com/app/index/index', {
      method:'POST',
      headers: {
        versionNum: '1.0.2',
        usertype:'1',
        platformType:'iOS',
        authCode:authcode,
        timestamp:timeStamp,
      },
      body: JSON.stringify({
        region_name:'广州',
      }),
    })
    .then((response) => {
     return response.json()
    })
    .then((responseJson) => {
      this.setState({
        load:true,
        dataSource:responseJson.data.adList
      })
      console.log(responseJson);
      return responseJson.data
    })
    .catch((error) => {
      console.warn(error)
    })
    .done()
  }

}

export class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
      title: params ? params.otherParam : 'Details Screen'
    }
  }
  componentWillUnmount() {

  }
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('id','0');
    const title = navigation.getParam('title','No title');
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#6a51ae"
         />
        <Text>DetailsScreen </Text>
        <Text>title is {title}</Text>
        <Text>Id is {itemId}</Text>
        <Button title='Go to next Screen'
                onPress={() => this.props.navigation.push('Details')}/>
        <Button title='Back to Home'
                onPress={() => this.props.navigation.navigate('Home')}/>
        <Button title='Back to Top'
                onPress={() => this.props.navigation.popToTop()}/>
        <Button title='Go back'
                onPress={() => this.props.navigation.goBack()}/>
        <Button title='Update Title'
                onPress={() => this.props.navigation.setParams({otherParam : 'Update Current Title Successfully!'})}/>
      </View>
    );
  }
}
