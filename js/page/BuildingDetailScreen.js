import React, {Component} from 'react'
import {
  Text,
  ScrollView,
  View,
  PixelRatio,
} from 'react-native'
import CycleScrollView from './CycleScrollView'
import NetManager from './NetManager'
import {styles} from './StyleSheet'
import {TagsView} from './HomeSectionListCell'

export default class BuildingDetailScreen extends React.Component {
  static navigationOptions = {
    title:'楼盘详情',
  }

  constructor(props) {
    super(props);
    this.state={
      dataSource:null,
    }
  }

  render() {
    if (this.state.dataSource == null) {
      return <View />
    }
    return (
      <ScrollView>
        <BuidingDetailHeaderInfoView buildingInfo={this.state.dataSource.info}/>
      </ScrollView>
    )
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const {navigation} = this.props;
    let parameters = {
      id : navigation.getParam('buildingId', 0),
      room_id : navigation.getParam('roomId', null),
    }
    NetManager.fetchRequest('/app/project/detail','POST', parameters, (data, msg) => {
      console.log(data, msg);
      if (data != null) {
        this.setState({
          dataSource: data,
        })
      }
    });
  }
}

class BuidingDetailHeaderInfoView extends Component {
  render() {
    let buildingInfo = this.props.buildingInfo;
    let bannerList = buildingInfo.bannerList;
    let tags = buildingInfo.tags_ids;
    return (
      <View>
         <CycleScrollView adList={bannerList} style={styles.cycleScrollView}/>
         <View style={{backgroundColor: 'white', padding:15}}>
          <Text style={{fontSize:17, marginBottom:15}}>{buildingInfo['name']}</Text>
          <TagsView tags={tags} style={{marginTop:15, marginLeft:15}}/>
          <View style={{backgroundColor:'#ddd', height:1 / PixelRatio.get(), marginTop : 15, marginLeft:-15, marginRight:-15}}></View>
          <Text style={{fontSize:15, color: "#ff6c15", marginTop:15}}>{buildingInfo['price']}</Text>
         </View>
      </View>
    )
  }
}

class BuildingCommissionPlan extends Component {
  render() {
    return (
      <View />
    )
  }
}
