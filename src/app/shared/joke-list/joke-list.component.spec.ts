import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeListComponent } from './joke-list.component';
import { By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Joke } from '../../models/joke.model';
import { IJokeListInputConfiguration } from './joke-list-input-config.model';


describe('JokeListComponent', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;

  let router: Router;
  let mockJokes: Joke[] = [
    { id: '1', joke: 'Joke 1', status: 200 },
    { id: '2', joke: 'Joke 2', status: 200 },
    { id: '3', joke: 'Joke 3', status: 200 },
    { id: '4', joke: 'Joke 4', status: 200 },
    { id: '5', joke: 'Joke 5', status: 200 },
    { id: '6', joke: 'Joke 6', status: 200 },
    { id: '7', joke: 'Joke 7', status: 200 },
    { id: '8', joke: 'Joke 8', status: 200 },
    { id: '9', joke: 'Joke 9', status: 200 },
    { id: '10', joke: 'Joke 10', status: 200 },
    { id: '11', joke: 'Joke 11', status: 200 },
    { id: '12', joke: 'Joke 12', status: 200 },
    { id: '13', joke: 'Joke 13', status: 200 },
    { id: '14', joke: 'Joke 14', status: 200 },
    { id: '15', joke: 'Joke 15', status: 200 },
    { id: '16', joke: 'Joke 16', status: 200 },
  ];
  let paginationConfiguration: IJokeListInputConfiguration = {
    page: 1,
    totalItems: mockJokes.length,
    jokeList: mockJokes
  }
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [JokeListComponent],
      imports: [
        NgxPaginationModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    component.paginationConfiguration = paginationConfiguration;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 15 jokes when jokeList has more then 15 jokes', () => {
    const jokeItemWrapper = fixture.debugElement.queryAll(By.css('.joke-item-wrapper'));
    expect(jokeItemWrapper.length).toBe(15);
  });
  it('should display number of jokes equal to jokeList length when jokelist has 15 or less jokes', () => {
    component.paginationConfiguration = {
      page: 1,
      totalItems: 5,
      jokeList: mockJokes.slice(0, 5)
    };
    fixture.detectChanges();
    const jokeItemWrapper = fixture.debugElement.queryAll(By.css('.joke-item-wrapper'));
    expect(jokeItemWrapper.length).toBe(5);
  });
  it('should display message when no jokes are in the list', () => {
    component.paginationConfiguration = {
      page: 1,
      totalItems: 0,
      jokeList: []
    };
    fixture.detectChanges();
    const noItemsMessage = fixture.debugElement.query(By.css('#no-items-message'));
    expect(noItemsMessage).toBeDefined();
  });

  it('should emit pageChangedEvent when pagination-controls emits onPageChange event', () => {
    component.paginationConfiguration = {
      page: 1,
      totalItems: mockJokes.length,
      jokeList: mockJokes
    };
    fixture.detectChanges();
    spyOn(component.pageChangedEvent, 'emit');
    const paginationControls = fixture.debugElement.query(By.css('pagination-controls'));
    paginationControls.triggerEventHandler('pageChange', 2);
    expect(component.pageChangedEvent.emit).toHaveBeenCalledWith(2);
  });
  it
});
