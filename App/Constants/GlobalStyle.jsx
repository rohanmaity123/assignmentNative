import {Dimensions, StyleSheet} from 'react-native';
import { moderateScale, verticalScale } from '../Components/PixalRatio/index';
import { COLORS } from './Color';
const {width, height} = Dimensions.get('window');

export const Global_Style = StyleSheet.create({
  button: {
    width: width - 20,
    height: verticalScale(35),
    backgroundColor: COLORS.primaryYellow,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(10),
  },
  smallbutton: {
    height: verticalScale(35),
    backgroundColor: COLORS.primaryYellow,
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(130),
  },
});
