import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {Movie} from '../models/index';
import { IsolatedMovieService } from './isolatedmovie.service';


describe('HistoryComponent', () => {

   let movieService : IsolatedMovieService;
   let movie = new Movie();
   movie.Title = "Add movie"
   movie.imdbID ="Tem imdb";
   movie.Poster ="paost test";
   movie.Type ="U";
   movie.Year ="2010";
   it('isolated test without http mocking', () => {
        let service = new IsolatedMovieService();
        expect(service instanceof IsolatedMovieService).toBe(true, 'new service should be ok');
   });
   // Only business logic test
   it('isolated test of business logic',() => {
        let service = new IsolatedMovieService();
        service.addMovie(movie);
        let mv = service.getMovie();
        expect(mv[0].Title).toBe("Add movie");
    });

});
