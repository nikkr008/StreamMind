import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// Base spacing unit
export const BASE_SPACING = 8;

// Spacing scale
export const SPACING = {
  xs: BASE_SPACING * 0.5, // 4
  sm: BASE_SPACING,       // 8
  md: BASE_SPACING * 2,   // 16
  lg: BASE_SPACING * 3,   // 24
  xl: BASE_SPACING * 4,   // 32
  xxl: BASE_SPACING * 5,  // 40
};

// Screen dimensions
export const DIMENSIONS = {
  windowWidth,
  windowHeight,
  
  // Common ratios
  buttonHeight: windowHeight * 0.06,
  inputHeight: windowHeight * 0.05,
  imageHeight: windowHeight * 0.6,
  profileImageSize: windowHeight * 0.2,
}; 