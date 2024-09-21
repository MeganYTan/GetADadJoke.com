/**
 * Interface for Joke object returned by API 
 */
export interface Joke {
  /**
   * Unique identifier of the joke
   */
  id: string;
  /**
   * Joke text
   */
  joke: string;
  /**
   * Joke status indicating success or failure of fetching the joke
   * 200: Joke successfully fetched
   * 404: Joke not found
   */
  status?: number;
}