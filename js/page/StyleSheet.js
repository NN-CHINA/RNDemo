import {
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native'

// iPhoneX
const iPhoneX_WIDTH = 375;
const iPhoneX_HEIGHT = 812;

export const deviceWidth = Dimensions.get('window').width;

export const deviceHeight = Dimensions.get('window').height;

export const onePixelLength = 1 / PixelRatio.get();

export function isIphoneX() {
  return (
    Platform.OS === 'ios' && ((deviceWidth === iPhoneX_WIDTH && deviceHeight === iPhoneX_HEIGHT) || (deviceWidth == iPhoneX_HEIGHT && deviceHeight == iPhoneX_WIDTH))
  )
}

export const statusBarHeight = (isIphoneX == true ? 44 : 20);

export const styles = StyleSheet.create({
  cycleScrollView: {
    height: deviceWidth * 9 / 16,
  }
})
