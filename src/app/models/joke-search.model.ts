import { Joke } from './joke.model';
/**
 * Interface for Response Object returned by search API
 */
export interface JokeSearchResponse {
  /**
   * Current page number for search result
   */
  current_page: number;
  /**
   * Number of jokes fetched in results
   */
  limit: number;
  /**
   * Next page number for search result
   */
  next_page: number;
  /**
   * Previous page number for search result
   */
  previous_page: number;
  /**
   * List of jokes returned by current search
   */
  results: Joke[]; 
  /**
   * Term used to search for jokes
   */
  search_term: string;
  /**
   * Status code indicating success or failure of the search request
   */
  status: number;
  /**
   * Total jokes associated with the current search_term
   */
  total_jokes: number;
  /**
   * Total pages associated with current search_term
   */
  total_pages: number;
}