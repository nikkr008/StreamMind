import { Dimensions ,Platform} from 'react-native';


export const windowWidth = Math.round(Dimensions.get('window').width);
export const windowHeight = Math.round(Dimensions.get('window').height);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//const UIBaseHeight = 800;
const UIBaseWidth = 360;

const UIBaseHeight = Platform.OS === 'ios' ? windowHeight > 800 ? 800 : 650 : 800

const adjustedHeight = (size: number) => {
  return size * (SCREEN_HEIGHT / UIBaseHeight);
};

const adjustedWidth = (size: number) => {
  return size * (SCREEN_WIDTH / UIBaseWidth);
};

// font-size
const adjustedScale = (size: number, factor = 0.5) => {
  return size + (adjustedWidth(size) - size) * factor;
};

export {
  adjustedHeight,
  adjustedWidth,
  adjustedScale,
};