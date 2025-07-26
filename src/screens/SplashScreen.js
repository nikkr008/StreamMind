import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { SCREEN_NAMES } from '../utils/constants';
import { COLORS } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations sequence
    const startAnimations = () => {
      // First phase: Fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.back()),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Second phase: Underline and glow animations
        Animated.parallel([
          Animated.timing(underlineAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(glowAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
              }),
              Animated.timing(glowAnim, {
                toValue: 0,
                duration: 1500,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
              }),
            ]),
            { iterations: 2 }
          ),
        ]).start();
      });
    };

    // Navigate to login after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace(SCREEN_NAMES.LOGIN);
    }, 3000);

    startAnimations();

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, underlineAnim, glowAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../assets/images/MoviesBackground.jpeg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.3)', // Light dark at top
            'rgba(0, 0, 0, 0.5)', // Medium dark in middle
            'rgba(0, 0, 0, 0.7)', // More dark at bottom
          ]}
          style={styles.gradient}
          locations={[0, 0.5, 1]}
        >
          <View style={styles.content}>
            <Animated.View
              style={[
                styles.textContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    { translateY: slideAnim },
                  ],
                },
              ]}
            >
              <Animated.Text 
                style={[
                  styles.title,
                  {
                    opacity: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  }
                ]}
              >
                StreamMind
              </Animated.Text>
                             <Animated.View 
                 style={[
                   styles.underline,
                   {
                     width: underlineAnim.interpolate({
                       inputRange: [0, 1],
                       outputRange: [0, 120],
                     }),
                     opacity: glowAnim.interpolate({
                       inputRange: [0, 1],
                       outputRange: [0.7, 1],
                     }),
                   }
                 ]} 
               />
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 20,
    fontFamily: 'System',
  },
  underline: {
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 2,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 8,
    alignSelf: 'center',
  },
});

export default SplashScreen; 