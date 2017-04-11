import { Injectable }     from '@angular/core';
import {Movie} from '../models/index';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class IsolatedMovieService {
    private movieHistory: Movie[] = [];
   
 addMovie(movie:Movie){
        if(movie){
            movie.TimeOfSearch = new Date();
            this.movieHistory.push(movie);
        }
    }

 getMovie():Movie[]{
        return this.movieHistory;
  }
  
}

