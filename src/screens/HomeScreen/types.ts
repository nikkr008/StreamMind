import { Movie } from "../../services/HomeScreenService/types";

export interface HomeViewModelState {
  // Data
  movies: Movie[];
  filteredMovies: Movie[];
  
  // UI State
  isLoading: boolean;
  error: string | null;
  selectedLanguage: string | null;
  currentPage: number;
  

  canGoBack: boolean;
  availableLanguages: string[];
}

export interface HomeViewModelActions {
  loadMovies: (page?: number) => Promise<void>;
  filterByLanguage: (language: string | null) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  clearError: () => void;
  refreshMovies: () => Promise<void>;
}