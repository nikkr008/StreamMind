import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { Movie } from '../../services/HomeScreenService/types';

interface MovieItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  styles: any;
}

export const MovieItem: React.FC<MovieItemProps> = ({
    movie,
    onPress,
    styles,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(movie)}>
      <View style={styles.movieContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={styles.movieImage}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDes}>
            Popularity: {movie.popularity.toFixed(1)}
            {'\n'}Vote count: {movie.vote_count}
            {'\n'}Language: {movie.original_language}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
