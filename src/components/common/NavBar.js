import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {View, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileMenu from '../../screens/profile/profileMenu';
import Favourite from '../../screens/movie/favourite';

const NavBar = () => {
  const navigation= useNavigation()
  return (
    <View style={{flexDirection: 'row'}}>
      {/* <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginRight: 80
        }}
      /> */}
      <TouchableOpacity onPress={()=>{navigation.navigate('ProfileMenu')}}>
        <FontAwesome name="user" size={38} color="#ffffff" paddingRight={20}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('Favourite')}}>
        <FontAwesome name="heart" size={38} color="#ffffff" paddingRight={0}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NavBar; 