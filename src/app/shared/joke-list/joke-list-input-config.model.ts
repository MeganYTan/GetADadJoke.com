import { Joke } from "../../models/joke.model";
/**
 * Configuration for the Input of JokeListComponent
 */
export interface IJokeListInputConfiguration {
    /**
     * The array of jokes to be displayed.
     */
    jokeList: Joke[],
    /**
     * The page number to be shown on the paginator control
     */
    page: number,
    /**
     * The total number of items to calculate the number of pages
     */
    totalItems: number
}