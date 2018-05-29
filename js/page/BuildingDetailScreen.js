import React, {Component} from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Button,
  PixelRatio,
} from 'react-native'
import CycleScrollView from './CycleScrollView'
import NetManager from './NetManager'
import {
  styles,
  deviceWidth,
  deviceHeight,
  statusBarHeight,
  onePixelLength,
} from './StyleSheet'
import HomeSectionListCell, {
  TagsView,
} from './HomeSectionListCell'
import {
  CustomerTopImageButton,
} from './CommonComponent'

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
    console.log(deviceWidth, deviceHeight);
    console.log(statusBarHeight);
    return (
      <View>
        <ScrollView style={{height:(deviceHeight - 44 - 49 - statusBarHeight)}}>
          <BuidingDetailHeaderInfoView buildingInfo={dataSource.info}/>
          <BuildingCommissionPlan plan={dataSource.plan}/>
          <BuildingProppertyList propertyList={dataSource.info.lShow}/>
          <BuildingMainType mainTypeList={dataSource.htype}/>
          <BuildingLocation buildingInfo={dataSource.info} />
          <BuildingSale/>
          <BuildingRecommend recommendList={dataSource.rePlist}/>
        </ScrollView>
        <BottomTabBar style={{height:49, backgroundColor:'#f00',marginTop:10}}/>
      </View>
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
    let mainTypeList = this.props.mainTypeList;
    let mainTypeView = mainTypeList.map(
      (typeInfo) => {
        return (
          <View>
          <Image source={{uri:typeInfo.pic_path}} style={{width:200, height:200, marginRight:10}}/>
          <Text style={{marginTop:10, color:'#ff6c15'}}>【{typeInfo.name}】
            <Text style={{color:'#666'}}>{typeInfo.description}</Text>
          </Text>
          </View>
        )
      }
    )
    return (
      <View style={{backgroundColor:'white', padding:15, paddingBottom:0, marginTop:10}}>
        <Text style={{fontSize:17}}>主力户型</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
        <ScrollView style={{marginLeft:-15, marginRight:-15, padding:15}} horizontal={true} showsHorizontalScrollIndicator={false}>
          {mainTypeView}
        </ScrollView>
      </View>
    )
  }
}

class BuildingLocation extends Component {
  render() {
    let buildingInfo = this.props.buildingInfo;
    let address = buildingInfo.address;
    let imagePath = buildingInfo.map_img;
    return(
      <View style={{backgroundColor:'#fff', padding:15, paddingBottom:0, marginTop:10}}>
        <Text style={{fontSize:17}}>楼盘位置</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
        <Text style={{marginTop:15, marginBottom:15}}>{address}</Text>
        <Image source={{uri:imagePath}} style={{width:deviceWidth, height:deviceWidth * 9 / 16, marginLeft:-15}}/>
      </View>
    )
  }
}

class BuildingSale extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={{backgroundColor:'#fff', padding:15, marginTop:10}}>
        <Text>阳光销控</Text>
      </View>
    )
  }
}

class BuildingRecommend extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let recommendList = this.props.recommendList;
    let recommendView = recommendList.map(
      (recommendInfo) => {
        return (
          <HomeSectionListCell data={recommendInfo}/>
        )
      }
    )
    return(
      <View style={{backgroundColor:'#fff', padding:15, marginTop:10, paddingBottom:0, marginBottom:10}}>
        <Text style={{fontSize:17}}>相关推荐</Text>
        <View style={{backgroundColor:'#ddd', height:1/PixelRatio.get(), marginTop:15, marginLeft:-15, marginRight:-15}}/>
        <View style={{marginLeft:-15, marginRight:-15}}>
        {recommendView}
        </View>
      </View>
    )
  }
}

class BottomTabBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={{backgroundColor:'#fff', height:49, borderTopColor:'#ddd',borderTopWidth:onePixelLength, alignItems:'center', flexDirection:'row'}}>
        <CustomerTopImageButton title={'咨询'} style={{width:deviceWidth / 4}}/>
        <View style={{width:onePixelLength, height:36, backgroundColor:'#ddd'}}></View>
        <CustomerTopImageButton title={'收藏'} style={{width:deviceWidth / 4}} type={'collecte'}/>
        <View style={{backgroundColor:'#ff6c15', width:deviceWidth / 2, height:49, alignItems:'center', justifyContent:'center'}}>
          <Button title='推荐客户' color="#fff"/>
        </View>
      </View>
    )
  }
}
