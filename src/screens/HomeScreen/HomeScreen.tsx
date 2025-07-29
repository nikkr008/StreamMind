import React from 'react';
import { 
  View, 
  FlatList, 
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { useHomeViewModel } from '../../ViewModels/useHomeViewModel';
import { LanguageFilter } from '../../components/common/LanguageFilter';
import { MovieItem } from '../../components/common/MovieItem';
import { PaginationControls } from '../../components/common/Pagination';
import { ErrorDisplay } from '../../components/common/ErrorDisplay';
import { Movie } from '../../services/HomeScreenService/types';
import { styles } from './styles';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    filteredMovies,
    isLoading,
    error,
    selectedLanguage,
    currentPage,
    canGoBack,
    availableLanguages,
    
    filterByLanguage,
    goToNextPage,
    goToPreviousPage,
    refreshMovies,
  } = useHomeViewModel();

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { item: movie });
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <MovieItem 
      movie={item} 
      onPress={handleMoviePress} 
      styles={styles} 
    />
  );

  if (error && filteredMovies.length === 0) {
    return (
      <View style={styles.body}>
        <ErrorDisplay 
          error={error} 
          onRetry={refreshMovies} 
          styles={styles}
        />
      </View>
    );
  }

  return (
    <>
      <View style={styles.body}>
        <LanguageFilter
          availableLanguages={availableLanguages}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={filterByLanguage}
          styles={styles}
        />

        {isLoading && filteredMovies.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={refreshMovies}
                tintColor="#007AFF"
              />
            }
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>

      <PaginationControls
        canGoBack={canGoBack}
        currentPage={currentPage}
        onPreviousPage={goToPreviousPage}
        onNextPage={goToNextPage}
        styles={styles}
      />
    </>
  );
};

export default HomeScreen;
