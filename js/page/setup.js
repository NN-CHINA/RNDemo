import React, {Component} from 'react'
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'

import {
  Text,
  View,
} from 'react-native'

import HomePage from './HomePage'

class HomeScreen extends React.Component {
    render() {
      return(
        <View>
          <Text>HomeScreen</Text>
        </View>
      );
    }
}

// class MyScreen extends React.Component {
//   render() {
//     return (
//
//     );
//   }
// }

export default TabNavigator(
  {
    首页 : {
      screen : HomeScreen,
    },
    我的 : {
      screen : HomeScreen,
    }

  }
)

// export default class Index extends Component {
//
//     _renderTab(title) {
//       return (
//         <TabNavigator.Item>
//           title={title}
//         </TabNavigator.Item>
//       )
//     }
//
//     render(){
//       return (
//         <View>
//           // <TabNavigator>
//           //     {this._renderTab('首页')}
//           //     {this._renderTab('我的')}
//           // </TabNavigator>
//         </View>
//       )
//     }
// }
