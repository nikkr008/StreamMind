import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ForgotPassword({navigation}) {
  const [state, setState] = useState({email: '', password: ''})
  
  const handleSubmit= ()=>{
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(state.email)) {
        alert('Invalid Email. Please enter a valid email address.');
      } 
      else {
        alert(`${state.email}, ${state.password}`);
        navigation.navigate('LoginScreen');
      }
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../../assets/images/head.png')} style={styles.image} />
            <Image source={require('../../assets/images/profileLogo.png')} style={styles.Profileimg} />
            <Text style={styles.title}>Update Password</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState(prevState => ({ ...prevState, email: text }))}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setState(prevState => ({ ...prevState, password: text }))}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.signup}>
                <Text style={{color: '#000000', marginTop:8, paddingRight: 8, fontSize: 18}}> Don't Have an Account </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: windowWidth,
        height: windowHeight
    },
    title: {
        fontWeight: "500",
        fontSize: 24,
        color: "#000000",
        marginBottom: 40,
    },
    inputView: {
        width: windowWidth*0.8,
        // backgroundColor: "#b0ebc0",
        // borderRadius: 25,
        height: windowHeight*0.05,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        borderBottomColor: '#000000',
        borderBottomWidth: 2
    },
    inputText: {
        height: 50,
        color: "#000000",
        alignItems: 'flex-start'
    },
    signup:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    signUpText:{
        color: "#10661a",
        fontSize: 24,
        fontWeight: '500',
        marginTop: 1
    },
    submitBtn: {
        width: "40%",
        backgroundColor: "#10661a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 100
    },
    submitText:{
        fontSize: 16,
        fontWeight: '300',
        color: '#ffffff'
    },
    image:{
        width: "100%",
        height: 450,
        position: 'absolute',
        top: 0
    },
    Profileimg:{
        marginTop: 10,
        height: 150,
        width: 150,
        borderRadius: 500,
    }
}); 