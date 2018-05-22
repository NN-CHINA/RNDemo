import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native'

export default class HomeSectionListCell extends React.Component {
  render() {
    console.log(this.props.data);
    return (
      <View style={styles.cell}>
        <Image source={{uri:this.props.data.cover_img}}
          style={styles.image}
        />
        <View style={styles.rightContainerView}>
          <Text style={styles.title}>NN</Text>
          <TagsView tags={this.props.data.tags_ids}/>
        </View>
      </View>
    )
  }
}

function TagsView(props) {
  const tagsView = props.tags.map(
    (tagInfo) => {
      console.log(tagInfo);
      return (
        <Text key={tagInfo} style={styles.tags}>{tagInfo}</Text>
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
    backgroundColor:'#fff',
    height:120,
    flexDirection:'row',
  },
  image: {
    backgroundColor:'#f00',
    marginTop:10,
    marginBottom:10,
    height:100,
    width:100,
    left:10,
  },
  title: {
    fontSize:17,
    left:20,
    backgroundColor:'#f00',
    top:10,
  },
  rightContainerView: {
    flexDirection:'column',
  },
  tagsContainer:{
    flexDirection:'row',
    left:20,
  },
  tags: {
    backgroundColor:'#ddd',
  }
})
