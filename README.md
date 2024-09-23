# GetADadJoke

GetADadJoke.com is a web application where you can get a dad joke! The website has the following features:
* see all jokes on the home page
* get a random dad joke
* search for joke
* view jokes on a dedicated joke page
* copy joke text
* share joke link
* save a joke by making it a favorite
* viewing all favorite jokes

GetADadJoke.com is built with Angular and uses the API from [icanhazdadjoke API](https://icanhazdadjoke.com/).

Access GetADadJoke.com on GitHub Pages [here](https://meganytan.github.io/GetADadJoke.com/).

# Development Process

View the thought process behind building this application [here](GetADadJoke.com%20Thought%20Process.pdf).

# Code Overview

## Directory Overview

```plaintext
app/
├── layout/                 # Module that contains the header and footer components
│   ├── footer/
│   └── header/
├── models/                 # TypeScript interfaces for data models
├── pages/                  # Top-level pages in the application
│   ├── favorites/          # Displays the list of favorite jokes
│   ├── home/               # Serves as the home and search page
│   ├── joke-page/          # Displays individual jokes
│   └── page-not-found/     # Error page for non-existent routes
├── shared/                 # Shared components, directives, and services
│   ├── copy-button/        # Button to copy joke text
│   ├── directives/         # 
│   │   └── hide-element/   # Hides elements on smaller screens
│   ├── favorite-button/    # Button to favorite/unfavorite jokes
│   ├── joke-list/          # Renders a list of jokes, used in favorites and home
│   ├── services/           # 
│   │   ├── favorites/      # Manages favorited jokes
│   │   ├── joke/           # Manages the current joke
│   │   └── joke-http/      # Handles API calls for jokes
│   └── share-button/       # Button to copy the joke URL for sharing
```

## Design and Architecture

### LayoutModule
The `LayoutModule` is independent of the rest of the application, allowing the `Header` and `Footer` components to be easily swapped or modified without affecting other modules. It interacts with the rest of the application through routes.

### JokeListComponent
The `JokeListComponent` is responsible for rendering a list of jokes. It is used by the `Home` and `Favorites` components as this functionality is shared across those components.

### HideElementDirective
The `HideElementDirective` is used to hide the text on smaller screen. Because this functionality is common across the Favorite, Share, and Copy buttons, this directive encapsulates the logic to avoid code duplication.

### Services
- **FavoritesService**: Manages the user's list of favorite jokes and persists this data in `localStorage`, allowing users to retain their favorites across sessions.
- **JokeService**: Tracks the currently selected joke when a user clicks on one from a list, ensuring that no additional API call is needed when navigating to the joke page, as the data is already available.
- **JokeHttpService**: Handles all API calls.



# Running Locally

### Prerequisites
- **Node.js**
- **Angular CLI**

### Steps
1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/getadadjoke.git
   cd getadadjoke
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   ng serve
   ```

4. **Open the app in your browser**:

   Navigate to `http://localhost:4200/` to view the app in action.


## Linting

To lint the project, execute the following command:

```bash
ng lint
```

To fix lint issues, execute the following command:

```bash
ng lint --fix
```

## Testing

To run the test suite, execute the following command:

```bash
ng test
```

## Deployment

To deploy the application to GitHub Pages, execute the following commands:

1. Building the application
```bash
ng build --configuration production --output-path=docs --base-href /GetADadJoke.com/
```

2. Deploying the application
```bash
npx angular-cli-ghpages --dir=docs/browser
```

## Application Usage

1. **Home Page**: View all dadjokes available on the home page.
2. **Search Jokes**: Use the search bar to find jokes by keyword.
3. **Favorites**: Click the heart icon next to a joke to mark it as a favorite. Access your favorite jokes through the "Favorites" page.
4. **Share & Copy**: Use the share and copy buttons to share or copy the joke to your clipboard.