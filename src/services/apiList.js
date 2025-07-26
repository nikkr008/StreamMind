import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import MovieDetails from '../screens/movie/movieDetails';
import { ActivityIndicator, Text, View, FlatList, StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  let [p, setPage] = useState(1);
  
  const getMovies = async () => {
    try {
      let url = 'https://api.themoviedb.org/3/discover/movie?api_key=879bb3a6d9417fe3d3096d8dff174d73&page=' + p
      const response = await fetch(
        url,
      );
      const json = await response.json();
      setData(json.results);
      setFilteredData(json.results);
      // console.log(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterMoviesByLanguage = (language) => {
    if (language === null) {
      setFilteredData(data); // If no language selected, show all movies
    } else {
      const filteredMovies = data.filter((movie) => movie.original_language === language);
      setFilteredData(filteredMovies);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    filterMoviesByLanguage(language); // Update filtered movies when language changes
  }, [language]);

  useEffect(() => {
    getMovies();
  }, [p]);
  
  return (
    <>
    <View style={styles.body}>
      <View style={styles.languageBtn}>
        <TouchableOpacity onPress={() => setLanguage('en')}>
          <Text style={styles.languagetxt}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('ko')}>
          <Text style={styles.languagetxt}>Korean</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('de')}>
          <Text style={styles.languagetxt}>German</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <FlatList
          data={filteredData}
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
      )}
    </View>
    <View style={styles.loadBtn}>
        <TouchableOpacity onPress={() => {(p>0)?setPage(p--):setPage(p)}}>
          <Text style={styles.loadBtnTxt}> Back </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setPage(p++)}}>
          <Text style={styles.languagetxt}> More </Text>
        </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  body:{
    height: 'auto',
    width: 'auto',
    marginBottom: 'auto',
    padding: 'auto'
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
    fontSize: 18,
    marginLeft: 5,
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
  languageBtn:{
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      justifyContent: 'space-evenly',
      height: 60,
      backgroundColor: 'lightgrey'
  },
  languagetxt:{
      margin: 2,
      backgroundColor: '#438fb0',
      color: 'white',
      padding: 10,
      height: 40,
      width: 100,
      borderRadius: 5,
      paddingLeft: 30
  },
  loadBtn:{
    flexDirection: 'row',
      alignItems: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      justifyContent: 'space-evenly',
      height: 60,
      backgroundColor: 'lightgrey',
      marginTop: 10,
  },
  loadBtnTxt:{
      backgroundColor: '#438fb0',
      color: 'white',
      padding: 10,
      height: 40,
      width: 100,
      borderRadius: 5,
      paddingLeft: 30,
      justifyContent: 'center'
  }
});

export default MainScreen; 