import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import MovieDetails from '../screens/movie/movieDetails';
import MainScreen from '../services/apiList';
import ProfileMenu from '../screens/profile/profileMenu';
import Favourite from '../screens/movie/favourite';
import HelpCenter from '../screens/HelpCenter';

import NavBar from '../components/common/NavBar';

import { SCREEN_NAMES } from '../utils/constants';
import { COLORS } from '../styles/colors';

const Stack = createNativeStackNavigator();

const getDefaultHeaderOptions = (title) => ({
  title,
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => <NavBar />,
});

const screenConfigs = [
  {
    name: SCREEN_NAMES.LOGIN,
    component: LoginScreen,
    options: getDefaultHeaderOptions('Movies Suggestions'),
  },
  {
    name: SCREEN_NAMES.SIGNUP,
    component: SignUp,
    options: getDefaultHeaderOptions('Sign Up'),
  },
  {
    name: SCREEN_NAMES.FORGOT_PASSWORD,
    component: ForgotPassword,
    options: getDefaultHeaderOptions('Update Password'),
  },
  {
    name: SCREEN_NAMES.MAIN_SCREEN,
    component: MainScreen,
    options: getDefaultHeaderOptions('Movie List'),
  },
  {
    name: SCREEN_NAMES.MOVIE_DETAILS,
    component: MovieDetails,
    options: getDefaultHeaderOptions('Movie Details'),
  },
  {
    name: SCREEN_NAMES.PROFILE_MENU,
    component: ProfileMenu,
    options: {
      headerShown: false, 
    },
  },
  {
    name: SCREEN_NAMES.FAVOURITE,
    component: Favourite,
    options: getDefaultHeaderOptions('Favourites'),
  },
  {
    name: SCREEN_NAMES.HELP_CENTER,
    component: HelpCenter,
    options: getDefaultHeaderOptions('Help Center'),
  },
];

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName={SCREEN_NAMES.LOGIN}
      screenOptions={{
        headerBackTitleVisible: false,
        animation: 'slide_from_right',
      }}
    >
      {screenConfigs.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigator; 