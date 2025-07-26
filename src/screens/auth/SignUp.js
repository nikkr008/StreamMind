import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import React, {useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SignUp({navigation}) {
  const [state, setState] = useState({name: '', mobileNumber: '', email: '', dob: '', Gender: '', type: ''});
  
  const nameInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const dobInputRef = useRef(null);
  const genderInputRef = useRef(null);
  const typeInputRef = useRef(null);
  
  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fullNameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const mobileNumberRegex = /^\+?\d{2}?\d{10}$/;
    const dobRegex = /^(?:0[1-9]|[1-2][0-9]|3[0-1])-(?:0[1-9]|1[0-2])-(?:19|20)\d{2}$/;
    const validGenders = ["male", "female", "other"];
    const ValidType = ["business", "personal"];

    function isValidGender(gender) {
      const lowerCaseGender = gender.toLowerCase();
      return validGenders.includes(lowerCaseGender);
    }
    function isValidType(type) {
      const lowerCaseType = type.toLowerCase();
      return ValidType.includes(lowerCaseType);
    }

    if(!fullNameRegex.test(state.name))
    {
      alert('Invalid Name. Please enter a valid name.');
    }
    else if(!mobileNumberRegex.test(state.mobileNumber)){
      alert('Invalid mobile number. Please enter a valid mobile number ex: +919876543210.');
    }
    else if (!emailRegex.test(state.email)) {
      alert('Invalid Email, Please enter a valid email address ex: user@email.com');
    }
    else if (!dobRegex.test(state.dob)) {
      alert('Invalid Date of Birth. Please enter a valid Date of Birth ex: DD-MM-YYYY');
    }
    else if (!isValidGender(state.Gender)) {
      alert('Invalid Gender. Please enter a valid gender male, female and other');
    }
    else if (!isValidType(state.type)) {
      alert('Invalid type. Please enter a valid type Business or Personal');
    }
    else{
      alert(`${state.name}, ${state.mobileNumber}, ${state.email}, ${state.dob}, ${state.Gender}, ${state.type}`);
      navigation.navigate('ForgotPassword');
    }
  };

  const handleReset = () => {
    setState({name: '', mobileNumber: '', email: '', dob: '', Gender: '', type: ''});
    nameInputRef.current.clear();
    mobileInputRef.current.clear();
    emailInputRef.current.clear();
    dobInputRef.current.clear();
    genderInputRef.current.clear();
    typeInputRef.current.clear();
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../../assets/images/head.png')} style={styles.image} />
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={nameInputRef}
          style={styles.inputText}
          placeholder="name"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, name: text}))
          }
        />
        <TextInput
          ref={mobileInputRef}
          style={styles.inputText}
          placeholder="Mobile Number"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, mobileNumber: text}))
          }
        />
        <TextInput
          ref={emailInputRef}
          style={styles.inputText}
          placeholder="email"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, email: text}))
          }
        />
        <TextInput
          ref={dobInputRef}
          style={styles.inputText}
          placeholder="Date Of Birth"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, dob: text}))
          }
        />
        <TextInput
          ref={genderInputRef}
          style={styles.inputText}
          placeholder="Gender"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, Gender: text}))
          }
        />
        <TextInput
          ref={typeInputRef}
          style={styles.inputText}
          placeholder="Type Business / Personal"
          placeholderTextColor="#7c8f81"
          onChangeText={text =>
            setState(prevState => ({...prevState, type: text}))
          }
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.SubmitBtn}>
          <Text style={{fontSize: 20, fontWeight: '300', color: '#fff'}} onPress={handleSubmit}> Submit </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetCancel} onPress={handleReset}>
          <Text style={{fontSize: 18, fontWeight: '300', color: '#000000'}}> Reset </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetCancel}>
          <Text style={{fontSize: 18, fontWeight: '300', color: '#000000'}} onPress={() => navigation.navigate('LoginScreen')}> Cancel </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: windowWidth,
    height: windowHeight*0.95,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    marginBottom: 40,
    marginTop: 140
  },
  inputView: {
    width: windowWidth*0.8,
    height: 'auto',
    // backgroundColor: 'red'
  },
  inputText: {
    height: 50,
    color: '#000000',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 1,
    borderBottomColor: '#000000',
    borderBottomWidth: 2
  },
  image: {
    width: windowWidth,
    height: 350,
    position: 'absolute',
    top: 0,
  },
  footer:{
    width: windowWidth,
    alignItems: 'center',
    flexDirection: 'row',
    // position: 'absolute',
    // bottom: 10,
  },
  SubmitBtn:{
    width: windowWidth*0.3,
    backgroundColor: "#10661a",
    borderRadius: 25,
    height: windowHeight*0.07,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    marginLeft: 30,
    marginRight: windowWidth/8.5
  },
  resetCancel:{
    margin: 5
  }
}); 