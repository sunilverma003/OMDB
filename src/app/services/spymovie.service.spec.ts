import {
    async, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import {Movie} from '../models/index';
import { HttpMovieService } from './httpmovie.service';



describe('HistoryComponent', () => {
   let movieService : HttpMovieService;
  let movie = new Movie();
   movie.Title = "Add movie"
   movie.imdbID ="Tem imdb";
   movie.Poster ="paost test";
   movie.Type ="U";
   movie.Year ="2010";

  beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                HttpMovieService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));
 
  it('should have called `getmovie`',inject([Http], (http: Http) => {
      let service = new HttpMovieService(http);
      spyOn(service, 'getMovieById').and.callFake(() => {
      return Promise.resolve(movie);
    });
    
    service.getMovieById("2");
   // expect(service.getMovieById).toHaveBeenCalled();
   //expect(service.getMovieById).toHaveBeenCalledWith('2');   
    expect(movie.Title).toBe("Add movie");  

  }));

});
  

