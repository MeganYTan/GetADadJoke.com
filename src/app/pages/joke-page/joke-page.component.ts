import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joke } from '../../models/joke.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { JokeHttpService } from '../../shared/services/joke-http/joke-http.service';
import { JokeService } from '../../shared/services/joke/joke.service';

@Component({
  selector: 'app-joke-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './joke-page.component.html',
  styleUrl: './joke-page.component.css'
})
export class JokePageComponent implements OnInit{
  joke: Joke | undefined;
  constructor(
    private jokeHttpService: JokeHttpService,
    private route: ActivatedRoute,
    private jokeService: JokeService
  ) {}
  ngOnInit(): void {
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
}
