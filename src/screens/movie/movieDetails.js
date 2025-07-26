import React, {useState, useContext} from "react";
import {StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import Favourite from "./favourite";
import {PracticeContext, PracticeProvider} from "../../context/Context";

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

function MovieDetails({ route, navigation }) {
  const [isFav, setIsFav] = useState(false);
  const {item} = route.params;
  let {val, setVal} = useContext(PracticeContext);
  const [fav, setFav] = useState(1);
    // setVal(item);
  // console.log("moviesPage "+ val);
  
    console.log("moviesPage fav "+ fav);
    const handleFav=(item)=>{
      console.log(item.title);
      setFav(item);
    };
    if (fav !== 1) {
      val.push(fav);
      }
      console.log("value ",val);
    // const { itemId } = route.params;
    // const { otherParam } = route.params;

    return (
    <View style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,}}
        style={styles.movieImage}
      />
        <View style={styles.txtContainer}>
        {/* <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
                <Text style={styles.titletxt} >{item.title}</Text>
                <Text style={styles.resttxt}><Text style={{color: 'blue', fontWeight:'bold'}}>Language: </Text>{item.original_language}</Text>
                <Text style={styles.resttxt}><Text style={{color: 'blue', fontWeight:'bold'}}>Release Date: </Text>{item.release_date}</Text>
                <Text style={styles.resttxt}><Text style={{color: 'blue', fontWeight:'bold'}}>Overview: </Text>{item.overview}</Text>
                <Text style={styles.resttxt}><Text style={{color: 'blue', fontWeight:'bold'}}>Popularity: </Text>{item.popularity}</Text>
        </View>
        <TouchableOpacity onPress={()=>handleFav(item)} style={styles.favBtn}>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '500'}}>Add to Fav</Text>
        </TouchableOpacity>
    </View>
    );
  }
  const styles = StyleSheet.create({
    container:{
      width: windowWidth,
      height: windowHeight,
      margin: 5,
      marginTop: 5,
    },
    movieImage: {
      height: windowHeight*0.5,
      width: windowWidth*0.95,
      margin: 2,
    },
    txtContainer:{
      width: windowWidth*0.95,
      height: 'auto',
      backgroundColor: '#ffffff',
      elevation: 5,
      margin: 5,
      padding: 10
    },
    titletxt:{
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000000'
    },
    resttxt:{
      fontSize: 14,
      fontWeight: '500',
      margin: 2,
      color: '#000000'
    },
    favBtn:{
      height: 50,
      width: 200,
      justifyContent: 'center',
      backgroundColor: '#70c8ff',
      borderRadius: 10, 
      alignItems: 'center',
      marginLeft: 100,
      margin: 10
    }
  })
export default MovieDetails; 