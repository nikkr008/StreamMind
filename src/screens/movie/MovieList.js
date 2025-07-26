import React from 'react'
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MainScreen from '../../services/apiList';
import MovieDetails from './movieDetails';

export default Logo = () => {
    return (
        <SafeAreaView>
            <MainScreen/>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({}) 