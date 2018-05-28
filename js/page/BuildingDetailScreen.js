import React, {Component} from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  ImageBackground,
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
    let dataSource = this.state.dataSource;
    if (dataSource == null) {
      return <View />
    }
    return (
      <ScrollView>
        <BuidingDetailHeaderInfoView buildingInfo={dataSource.info}/>
        <BuildingCommissionPlan plan={dataSource.plan}/>
        <BuildingProppertyList propertyList={dataSource.info.lShow}/>
        <BuildingMainType />
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
    function PlanList(props) {
      let commissionPlan = props.plan;
      let planView =commissionPlan.map(
              (plan) => {
                let planName = plan.name;
                let planCommission = plan.commission;
                return (
                  <ImageBackground source={require('./source/bg_commission.png')}
                    style={{width:123, height:63, alignItems:'center', justifyContent:'space-between', marginRight:10}}>
                    <Text style={{marginTop:8, fontSize:14}}>{planName}</Text>
                    <Text style={{marginBottom:8, fontSize:14, color:"#ff6c15"}}>{planCommission}</Text>
                  </ImageBackground>
                )
              }
            )
      return planView;
    }
    return (
      <View style={{backgroundColor:'white', marginTop:10, padding:15}}>
        <Text style={{fontSize:17}}>佣金方案</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
        <ScrollView style={{marginTop:15, flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
            <PlanList plan={this.props.plan} style={{}}/>
        </ScrollView>
      </View>
    )
  }
}

class BuildingProppertyList extends Component {
  render() {
    let propertyList = this.props.propertyList;
    var listArray = new Array();
    for (var property in propertyList) {
      if (propertyList.hasOwnProperty(property)) {
        let propertyItem = (
            <View>
            <View style={{padding:0, height:44, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text>{property}</Text>
              <Text>{propertyList[property]}</Text>
            </View>
            <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginLeft:-15, marginRight:-15}}/>
            </View>
          )
        listArray.push(propertyItem);
      }
    }
    return (
      <View style={{backgroundColor:'white', padding:15, marginTop:10, paddingBottom:0}}>
        <Text style={{fontSize:17}}>楼盘信息</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
        {listArray}
      </View>
    )
  }
}

class  BuildingMainType extends Component {
  render() {
    return (
      <View style={{backgroundColor:'white', padding:15, paddingBottom:0, marginTop:10}}>
        <Text style={{fontSize:17}}>主力户型</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
      </View>
    )
  }
}
