import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'

var deviceWidth = Dimensions.get('window').width;

import Swiper from 'react-native-swiper';


var deviceWidth = Dimensions.get('window').width;

export default class CycleScrollView extends React.Component {
  constructor(props) {
    super(props)
    this.state={

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(props) {
    console.log(props);
    this.props.onClick(props);
  }

  render() {
    if (this.props.adList == null) {
      return (
        <View style={{backgroundColor:'#f00'}}/>
      )
    }
    return <Content adList={this.props.adList} onClick={this.handleClick}/>
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height:deviceWidth * 9 / 16,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  image: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    width:deviceWidth,
  },
  dotStyle: {
    marginBottom:10,
  }
})


function Content(props) {
  const content = props.adList.map(
    (adInfo) => {
      console.log(props);
      return (
        <View key={adInfo}
              style={styles.slide1}
        >
          <TouchableHighlight onPress={
            () => {
              props.onClick(adInfo)
            }
          }>
              <Image source={{uri:(adInfo.pic_path != null ? adInfo.pic_path : adInfo)}}
                      style={styles.image} />
          </TouchableHighlight>
        </View>
      )
    }
  )
  const dot = <View style={{backgroundColor:'rgba(255,255,255,1)', width: 20, height: 6,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
  const activeDot =  <View style={{backgroundColor:'rgba(255,0,0,1)', width: 22, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />
  return (
    <Swiper style={styles.wrapper}
            showsButtons={false} autoplay={true}
            dot={dot}
            activeDot={activeDot}
            dotStyle={styles.dotStyle}
    >
      {content}
    </Swiper>
  );
}
