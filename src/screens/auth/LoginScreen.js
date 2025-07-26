import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = ({navigation}) => {
    const onPressLogin = () => {
            // Regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
            if (!emailRegex.test(state.email)) {
              alert('Invalid Email. Please enter a valid email address.');
            } 
            else {
                if(state.email === 'email@gmail.com' && state.password === 'Pass'){
                //   alert("Thanks nik");
                // alert(state.email);
                  navigation.navigate('MainScreen')
                }
                else{
                    alert("wrong password");
                }
                // You can perform further actions here, such as submitting the form
              }
    };

    const [state, setState] = useState({ email: '', password: '' });

    return (
        <SafeAreaView>
        <ScrollView>
            <KeyboardAvoidingView style={styles.container}>
                <Image source={require('../../assets/images/head.png')} style={styles.image} />
                <Image source={require('../../assets/images/ProfileImg.png')} style={styles.Profileimg} />
                <Text style={styles.title}>Sign in</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setState(prevState => ({ ...prevState, email: text }))}
                    />
                </View>
                <KeyboardAvoidingView style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setState(prevState => ({ ...prevState, password: text }))}
                    />
                </KeyboardAvoidingView>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot Your Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLogin} style={styles.signinBtn}>
                    <Text style={styles.signinText}>Sign in</Text>
                </TouchableOpacity>
                <View style={styles.signup}>
                    <Text style={{color: '#000000', marginTop:8, paddingRight: 8, fontSize: 15}}> Don't Have an Account </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: windowWidth,
        height: windowHeight
    },
    title: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#000000",
        marginBottom: 40,
    },
    inputView: {
        width: windowWidth * 0.8,
        backgroundColor: "#b0ebc0",
        borderRadius: 25,
        height: windowHeight * 0.06,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: windowHeight * 0.06,
        color: "#000000"
    },
    forgotText: {
        color: "#000000",
        fontSize: 12,
        marginTop: 1,
        marginLeft: windowWidth * 0.3
    },
    signup:{
        flexDirection: 'row',
        // position: 'absolute',
        bottom: 0,
    },
    signUpText:{
        color: "#10661a",
        fontSize: 20,
        fontWeight: '500',
        marginTop: 1
    },
    signinBtn: {
        width: windowWidth * 0.6,
        backgroundColor: "#10661a",
        borderRadius: 25,
        height: windowHeight * 0.06,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: windowHeight * 0.1
    },
    signinText:{
        fontSize: 18,
        fontWeight: '400',
        color:'#ffffff'
    },
    image:{
        width: "100%",
        height: windowHeight * 0.6,
        position: 'absolute',
        top: 0
    },
    Profileimg:{
        marginTop: 10,
        height: windowHeight * 0.2,
        width: windowHeight * 0.2,
        borderRadius: windowHeight * 0.2 / 2,
    }
});

export default LoginScreen; 