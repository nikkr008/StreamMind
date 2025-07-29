import { Movie, MoviesApiResponse } from "./types";

export const fetchMovies = {
  async getMovies(page: number = 1): Promise<MoviesApiResponse> {
    try {
      const API_Key = '879bb3a6d9417fe3d3096d8dff174d73';
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&page= + ${page}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies');
    }
  }
}