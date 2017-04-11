// import {TestBed, ComponentFixture} from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';
// import {
//     MockBackend,
//     MockConnection
// } from '@angular/http/testing';
// import {HistoryComponent} from './history.component';
// import {OrderByPipe} from '../../common/orderby.pipe';
// import {MovieService} from '../../services/index';

// describe('HistoryComponent', () => {
//     let historyComponent: HistoryComponent;
//     let movieService: MovieService;
//     let fixture: ComponentFixture<HistoryComponent>;
//     let de: DebugElement;
//     let el: HTMLElement;

//     beforeEach(() => {
//         let movieServiceStub = {
//             year: 1993,
//             movie: { name: 'Batman' }
//         };

//         TestBed.configureTestingModule({
//             declarations: [HistoryComponent, OrderByPipe],
//             providers: [{ provide: MovieService, useValue: movieServiceStub }]
//         });

//         fixture = TestBed.createComponent(HistoryComponent);
//         historyComponent = fixture.componentInstance;

//         // MovieService from the root injector
//         movieService = TestBed.get(MovieService);

//         //  get the "div" element by CSS selector (e.g., by class name)
//         de = fixture.debugElement.query(By.css('.list-group'));
//         el = de.nativeElement;
//     });

//     it('should instantiate the HistoryComponent', () => {
//         expect(fixture.componentInstance instanceof HistoryComponent).toBe(true, 'should create HistoryComponent');
//     });

// });

import { TestBed, async} from '@angular/core/testing';
import {HistoryComponent} from './history.component';
import {OrderByPipe} from '../../common/orderby.pipe';
import {MovieService} from '../../services/index';
import { Movie } from '../../models/index';

describe('HistoryComponent - no TestBed', () => {
  let comp: HistoryComponent;
  let expectedMovie: Movie;
  let hds: any;
  let router: any;

  beforeEach(async((done: Function) => {
    expectedMovie = new Movie();
    expectedMovie.Title = "Test abc";
    expectedMovie.Poster = "test poster";
    hds = jasmine.createSpyObj('MovieService', ['getMovie']);
    hds.getMovie.and.returnValue(Promise.resolve(expectedMovie));
    comp = new HistoryComponent(hds);
    comp.ngOnInit();
    // OnInit calls HDS.getMovie; wait for it to get the fake movie
    hds.getMovie.calls.first().returnValue.then(done);
  }));

  it('should expose the movie retrieved from the service', () => {
     expect(comp.movie.Title).toBe(expectedMovie.Title);
  });
});

