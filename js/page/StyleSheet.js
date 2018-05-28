import {
  StyleSheet,
  Dimensions,
} from 'react-native'


var deviceWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  cycleScrollView: {
    height: deviceWidth * 9 / 16,
  }
})
