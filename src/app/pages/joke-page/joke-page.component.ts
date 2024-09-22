import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationSkipped, Router } from '@angular/router';
import { Joke } from '../../models/joke.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { Subscription } from 'rxjs';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { JokeService } from '../../shared/services/joke.service';

/**
 * JokePageComponent is the component showing individual jokes. It is associated with the /joke route
 * - `routerSubscription`: subscripes to router events to check if the route has been called again so it can load a new joke
 */
@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [CommonModule, SharedModule, PageNotFoundComponent],
  templateUrl: './joke-page.component.html',
})
export class JokePageComponent implements OnInit, OnDestroy {
  joke: Joke | null = null;
  routerSubscription!: Subscription;
  jokeId: any = null;
  constructor(
    private jokeHttpService: JokeHttpService,
    private jokeService: JokeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    // reloadjoke when user navigates to /joke route from /joke/:id route
    this.route.paramMap.subscribe(params => {
      this.jokeId = params.get('id');
      this.getJoke();
    })
    // reloadjoke when user navigates to /joke route from /joke route 
    this.routerSubscription = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationSkipped) {
          this.getJoke();
        }
      });
  }
  getJoke(): void {
    console.log('getJoke', this.jokeId, this.jokeService.getCurrentJoke()?.id);
    // fetch the joke if id does not match joke from jokeService or if id is null, else get the joke from the jokeService
    if (this.jokeId === null || this.jokeId !== this.jokeService.getCurrentJoke()?.id) {
      console.log('in if');
      this.fetchJoke();
    } else {
      console.log('in else');
      this.joke = this.jokeService.getCurrentJoke();
    }
  }

  fetchJoke(): void {
    if (this.jokeId) {
      // get the joke associated with the id in the route
      this.jokeHttpService.getJokeById(this.jokeId).subscribe((data) => {
        this.joke = data.status === 404 ? null : data;
      })
    } else {
      // get a random joke
      this.jokeHttpService.getARandomJoke().subscribe((data) => {
        this.joke = data;
      });
    }
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
