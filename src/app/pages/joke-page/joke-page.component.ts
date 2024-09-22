import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { Joke } from '../../models/joke.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { Subscription } from 'rxjs';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

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
  jokeId:any = null;
  constructor(
    private jokeHttpService: JokeHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadJoke();
    // reloadjoke when user navigates to /joke route from /joke route 
    this.routerSubscription = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationSkipped) {
          this.loadJoke();
        }
      });
  }
  loadJoke(): void {
    
    var jokeId = this.route.snapshot.paramMap.get('id');
    this.jokeId = jokeId;
    if(jokeId) {
      // get the joke associated with the id in the route
      this.jokeHttpService.getJokeById(jokeId).subscribe((data) => {
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
