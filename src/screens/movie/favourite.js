import React, {useState, useContext} from "react";
import {Text, View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
// import MovieDetails from "./movieDetails";
import {PracticeContext, PracticeProvider} from '../../context/Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Favourite = ({navigation}) => {
   const {val, setVal} = useContext(PracticeContext);
  console.log("FavPage ",val);
  
    return(
        <View style={styles.container}>
          <View style={styles.itemcontainer}>
          <FlatList
          data={val}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate('MovieDetails', {
                item
              });
            }}>
            <View style={styles.movieContainer}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                }}
                style={styles.movieImage}
              />
              <View>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieDes}>
                  {" "}Popularity: {item.popularity}
                  {'\n'} Vote count: {item.vote_count}
                  {'\n'} language: {item.original_language}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
        </View>
        </View>
    ) 
}
const styles = StyleSheet.create({
  container:{
    width: windowWidth,
    height: windowHeight 
  },
  itemcontainer: {
    height: windowHeight,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
    margin: 2
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    margin: 2,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 10,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8
  },
  movieContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 'auto',
    width: 'auto',
    marginTop: 1,
    backgroundColor: 'lightgrey',
  },
  movieTitle: {
    marginTop: 8,
   marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000'
  },
  movieDes: {
    marginTop: 8,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000'
  },
  movieImage: {
    height: 100,
    width: 70,
    margin: 8,
  },
});
export default Favourite; 