import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Joke } from '../../models/joke.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './joke-page.component.html',
})
export class JokePageComponent implements OnInit, OnDestroy {
  joke: Joke | undefined;
  routerSubscription!: Subscription;
  constructor(
    private jokeHttpService: JokeHttpService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadJoke();
    this.routerSubscription = this.router.events
      .subscribe(() => {
        this.loadJoke();
      });
  }
  loadJoke(): void {
    var jokeId = this.route.snapshot.paramMap.get('id');
    if(jokeId) {
      this.jokeHttpService.getJokeById(jokeId).subscribe((data) => {
        this.joke = data;
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
