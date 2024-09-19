import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { JokePageComponent } from './pages/joke-page/joke-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
export const routes: Routes = [
    {
        path: '',
        title: 'Get A Dad Joke',
        component: HomeComponent
    },
    {
        path: 'search',
        title: 'Search Results',
        component: HomeComponent
    }, 
    {
        path: 'favorites',
        title: 'Favorites',
        component: FavoritesComponent
    },
    {
        path:'joke',
        title: 'Joke',
        component: JokePageComponent
    },
    {
        path:'joke/:id',
        title: 'Joke',
        component: JokePageComponent
    },
    {
        path: '**',
        title: 'Not Found',
        component: PageNotFoundComponent
    }
];
