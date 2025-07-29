export interface Movie {
  id: string;           
  title: string;        
  poster_path: string;  
  popularity: number;   
  vote_count: number;   
  original_language: string; 
}

export interface MoviesApiResponse {
  results: Movie[];      
  page: number;         
  total_pages: number;  
  total_results: number; 
}