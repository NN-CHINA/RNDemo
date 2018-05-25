import React, {Component} from 'react'
import {
  Text,
  ScrollView,
} from 'react-native'
import CycleScrollView from './CycleScrollView'
import {NetManager, fetchRequest} from './NetManager'

export default class BuildingDetailScreen extends React.Component {
  static navigationOptions = {
    title:'楼盘详情',
  }

  render() {
    return (
      <ScrollView>
        <BuidingDetailHeaderInfoView />
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
      room_id : navigation.getParam('roomId', 0),
    }
    console.log(parameters);
    NetManager.fetchRequest('/app/project/detail','POST', parameters, (data) => {
      console.log(data);
    });
  }
}

class BuidingDetailHeaderInfoView extends Component {
  render() {
    return (
      <CycleScrollView />
    )
  }
}
