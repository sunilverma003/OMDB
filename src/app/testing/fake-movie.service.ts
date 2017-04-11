// re-export for tester convenience
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Movie} from '../models/index';
import {HttpMovieService} from '../services/index';

var Movies: Movie[] = [ { Title:"test from fake", Poster:"rere", Year:" " , imdbID:" ",TimeOfSearch:new Date(), Type:" " } ]

 export class FakeMovieService  {
       private movieHistory: Movie[] = [];
          constructor() { }

    getAllMovies(): Observable<Movie[]> {
         
        return  Observable.of(this.movieHistory);
    }

   
 addMovie(movie:Movie){
        if(movie){
            movie.TimeOfSearch = new Date();
            this.movieHistory.push(movie);
        }
    }

   getMovieById(id: string): Observable<Movie> {
            let movie = this.movieHistory.find(h => h.imdbID === id);
            return  Observable.of(movie);

    }
    getMovie():Movie[]{
        return this.movieHistory;
    }
  
}

