import React, {Component} from 'react'
import {
  View,
  Text,
  Button,
  StatusBar,
  Dimensions,
  WebView,
  SectionList,
  ScrollView,
  PixelRatio,
  RefreshControl,
  InteractionManager,
} from 'react-native'
import CycleScrollView from './CycleScrollView'
import WebViewScreen from './WebView'
import HomeSectionListCell from './HomeSectionListCell'
import BuildingDetailScreen from './BuildingDetailScreen'
import Toast, {DURATION} from 'react-native-easy-toast'
import NoDataScreen from './NoDataScreen'

var deviceWidth = Dimensions.get('window').width;

//navigate and push accept an optional second argument
//to let you pass parameters to the route you are navigating to
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title:'首页',
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTintColor: '#000',
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
      dataSource:[],
      refreshing:false,
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

  onRefresh() {
    this.setState({
      refreshing:true
    })
    this.getData()
  }

  render() {
    return (
      <ScrollView style={{
        backgroundColor:'#FFF'
      }}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          // onEndReached={}
          // onEndReachedThreshold={}
        />
      }
      >
        <ContentView data={this.state.dataSource} navigation={this.props.navigation}/>
      </ScrollView>
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
        dataSource:responseJson.data,
        refreshing:false,
      })
      console.log(responseJson);
      return responseJson.data
    })
    .catch((error) => {
      console.warn(error)
      this.setState({
        refreshing:false,
      })
      this.refs.toast.show('网络请求失败')
    })
    .done()
  }

}

class  ContentView extends Component {
  render() {
      if (this.props == null) {
        return (
          <NoDataScreen />
        )
      }
      return (
        <View>
            <View style={{
              height:deviceWidth * 9 / 16
            }}>
                <CycleScrollView adList={this.props.data.adList} onClick={this.accessCycleScrollViewDetail}/>
            </View>
            <SectionListView data={this.props.data} navigation={this.props.navigation}/>
            <Toast ref="toast" position='top'/>
          </View>
      )
  }
}

class SectionListView extends Component {
  render() {
    if (this.props.data == null || this.props.data.length == 0) {
      return <View />
    }
    console.log(this.props.data);
    return (
      <SectionList
        sections={[
          {data:this.props.data.hotProjectList, title:'热销楼盘'},
          {data:this.props.data.promotionProjectList, title:'特价房源'}
        ]}
        renderItem={
          ({item}) => (
            <HomeSectionListCell data={item} onPress={
              () => this.props.navigation.push('BuildingDetail', {buildingId:item.id, roomId:item.room_id})
            }/>
          )
        }
        renderSectionHeader={
          ({section}) => (
            <SectionHeader data={section}/>
          )
        }
      />
    )
  }
}

class SectionHeader extends React.Component {
  render() {
    return (
      <View style={{height:44, backgroundColor:'#fff'}}>
        <View style={{height:44, flexDirection:'row', alignItems:'center'}} >
          <View style={{backgroundColor:'#ff6c15', width:5, height:28, }}/>
          <Text style={{marginLeft:8, fontSize:18, color:'#ff6c15'}}>{this.props.data.title}</Text>
        </View>
        <View style={{height:(1/PixelRatio.get()), backgroundColor:'#ddd'}}></View>
      </View>
    )
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
