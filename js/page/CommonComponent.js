import React, {Component} from 'react'
import {
  TouchableHighlight,
  Image,
  Text,
  View,
} from 'react-native'

export class CustomerTopImageButton extends Component {
  render() {
    let type = this.props.type;
    let selected = this.props.selected;
    let imageSource = require('./source/icon_advisory_gray.png');
    if (type === 'collecte') {
      imageSource = selected === true ? require('./source/icon_collection_sel.png') : require('./source/icon_collection_nor.png')
    }
    let subTitle = this.props.title;
    return(
      <TouchableHighlight>
        <View style={this.props.style}>
          <View style={{alignItems:'center', padding:4}}>
            <Image source={imageSource}/>
            <Text style={{marginTop:4, fontSize:13}}>{subTitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
