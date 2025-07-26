import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileMenu = ({navigation}) => {
  return (
    <View>
      <View style={styles.topContainer}>
        <Image source={require('../../assets/images/profileLogo.png')} style={styles.img}></Image>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginHorizontal: 30, color: '#000'}}>User Name</Text>
          <Text style={{fontSize: 14, marginHorizontal: 30, color: '#000'}}>email@gmai.com</Text>
        </View>
        <TouchableOpacity>
        <FontAwesome name="pencil" size={24} color="blue" paddingRight={30}/>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.element}>
          <FontAwesome name="user-circle" size={40} color="blue" padding={15}/>
          <View>
            <Text style={styles.heading}>Account</Text>
            <Text style={styles.subHeading}>Manage your account</Text>
          </View>
          <FontAwesome name="chevron-right" size={24} color="blue"/>
        </View>

          <TouchableOpacity onPress={() => {navigation.navigate('Favourite')}}>
        <View style={styles.element}>
            <FontAwesome name="heart" size={45} color="blue" paddingLeft={8}/>
            <View>
              <Text style={styles.heading}>Favourite</Text>
              <Text style={styles.subHeading}>Items you saved</Text>
            </View>
          <FontAwesome name="chevron-right" size={24} color="blue"/>
        </View>
          </TouchableOpacity>

        <View style={styles.element}>
          <FontAwesome name="gear" size={45} color="blue" paddingLeft={20} paddingRight={25}/>
          <View>
            <Text style={styles.heading}>Settings</Text>
            <Text style={styles.subHeading}>App notification settings</Text>
          </View>
          <FontAwesome name="chevron-right" size={24} color="blue"/>
        </View>

        <TouchableOpacity onPress={() => {navigation.navigate('HelpCenter')}}>
          <View style={styles.element}>
            <FontAwesome name="question-circle" size={40} color="blue" padding={30}/>
            <View>
              <Text style={styles.heading}>Help Center</Text>
              <Text style={styles.subHeading}>FAQ and Customer Support</Text>
            </View>
            <FontAwesome name="chevron-right" size={24} color="blue"/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')}} style={{height: 40, width: 200, marginLeft: 90, backgroundColor: 'blue',alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fff', fontSize: 22}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileMenu;

const styles= StyleSheet.create({
  img:{margin: 15, height: 100, width: 100, borderRadius: 200},
  heading:{fontWeight: 'bold', fontSize: 18, marginHorizontal: 30, color: '#000'},
  subHeading:{fontSize: 14, marginHorizontal: 30, color: '#000'},
  topContainer:{
    height: 100,
    width: 'auto',
    // backgroundColor:'red',
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomContainer:{
    height: 100,
    width: 'auto',
    // backgroundColor:'red',
    margin: 10
  },
  element:{
    height: 100,
    width: 'auto',
    // backgroundColor:'red',
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  }
}); 