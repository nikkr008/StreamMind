import { useState, useEffect, useCallback, use } from 'react';
import { Movie, MoviesApiResponse } from '../services/HomeScreenService/types';
import { fetchMovies } from '../services/HomeScreenService/HomeScreenService';

interface HomeViewModel {
    movies: Movie[];
    filteredMovies: Movie[];

    isLoading: boolean;
    error: string | null;
    selectedLanguage: string | null;
    currentPage: number;

    canGoBack: boolean;
    availableLanguages: string[];
}

interface HomeViewModelActions {
    loadMovies: (page: number) => void;
    filterByLanguage: (language: string | null) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    clearError: () => void;
    refreshMovies: () => Promise<void>;
}

export const useHomeViewModel = (): HomeViewModel & HomeViewModelActions => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const canGoBack = currentPage > 1;
    //movies.map(movie => movie.original_language) =>Returns an array of languages  
    //new Set(["en", "ko", "en", "de", "en", "ko"]) =>Result: Set {"en", "ko", "de"} removes duplicates
    //Array.from(Set {"en", "ko", "de"}) =>converts to array
    const availableLanguages = Array.from(new Set(movies.map(movie => movie.original_language))).sort();

    const loadMovies = useCallback(async (page: number = currentPage) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: MoviesApiResponse = await fetchMovies.getMovies(page);
            setMovies(response.results);
            setCurrentPage(page);

            filterMoviesData(response.results, selectedLanguage);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setMovies([]);
            setFilteredMovies([]);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, selectedLanguage]);

    const filterMoviesData = useCallback((moviesData: Movie[], language: string | null) => {
        if (!language) {
            setFilteredMovies(moviesData);
        } else {
            const filteredData = moviesData.filter(movie => movie.original_language === language);
            setFilteredMovies(filteredData);
        }
    }, []);
    const filterByLanguage = useCallback((language: string | null) => {
        setSelectedLanguage(language);
        filterMoviesData(movies, language);
    }, [movies, filterMoviesData]);

    const goToNextPage = useCallback(() => {
        const nextPage = currentPage + 1;
        loadMovies(nextPage);
    }, [currentPage, loadMovies]);

    const goToPreviousPage = useCallback(() => {
        if (canGoBack) {
            const previousPage = currentPage - 1;
            loadMovies(previousPage);
        }
    }, [canGoBack, currentPage, loadMovies]);

    const clearError = () => {
        setError(null);
    };

    const refreshMovies = useCallback(async () => {
        await loadMovies(currentPage);
    }, [currentPage, loadMovies]);

    useEffect(() => {
        loadMovies(1);
    }, []);

    return {
        movies,
        filteredMovies,
        isLoading,
        error,
        selectedLanguage,
        currentPage,
        canGoBack,
        availableLanguages,

        loadMovies,
        filterByLanguage,
        goToNextPage,
        goToPreviousPage,
        clearError,
        refreshMovies
    }
};
