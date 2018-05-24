import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  PixelRatio,
  TouchableHighlight,
} from 'react-native'


var deviceWidth = Dimensions.get('window').width;

export default class HomeSectionListCell extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <TouchableHighlight onPress={this.props.onPress}>
      <View style={styles.cell}>
        <View style={styles.cellContainer}>
          <image source={{ uri: this.props.data.cover_img}} />
          <View style={styles.rightContainerView}>
            <Text style={styles.title}>{this.props.data.name}</Text>
            <TagsView tags={this.props.data.tags_ids}/>
            <TagsView tags={this.props.data.cat_ids}/>
            <Text>佣金</Text>
          </View>
        </View>
        <View style={{backgroundColor:'#ddd', left:10, height:(1/PixelRatio.get())}}>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}


// <Image source={{uri:this.props.data.cover_img}}
//   style={styles.image}
// />
function TagsView(props) {
  const tagsView = props.tags.map(
    (tagInfo) => {
      return (
        <View  style={styles.tagsWarppedView}>
          <Text key={tagInfo} style={styles.tags}>{tagInfo}</Text>
        </View>
      )
    }
  );
  return (
    <View style={styles.tagsContainer}>
      {tagsView}
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor:'#fff'
  },
  cellContainer: {
      backgroundColor:'#fff',
      height:120,
      flexDirection:'row',
      padding:10,
  },
  image: {
    backgroundColor:'#FFF',
    height:100,
    width:100,
  },
  rightContainerView: {
    flexDirection:'column',
    backgroundColor:'#FFF',
    paddingLeft:10,
    justifyContent:'space-around',
    width: deviceWidth - 120,
  },
  title: {
    fontSize:17,
    color: "#333333"
  },
  tagsWarppedView: {
    backgroundColor: "#0000",
    height:20,
    justifyContent:'center',
  },
  tagsContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  tags: {
    color: "#999999",
    fontSize:12,
    paddingRight:3,
    paddingLeft:3,
    marginRight:3,
    borderColor:'#0000',
    borderWidth:4,
    backgroundColor:'#f2f2f2'
  }
})
