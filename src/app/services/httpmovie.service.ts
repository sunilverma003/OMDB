import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {Movie} from '../models/index';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpMovieService {
    private movieHistory: Movie[] = [];
    constructor(private http: Http) { }

    getAllMovies(): Observable<Movie[]> {
        return this.http.get("http://www.omdbapi.com/?s=Batman")
            .map(this.extractData)
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);
    }

 
   
 addMovie(movie:Movie){
        if(movie){
            movie.TimeOfSearch = new Date();
            this.movieHistory.push(movie);
        }
    }

   getMovieById(id: string): Observable<Movie[]> {

            return this.http.get("http://www.omdbapi.com/?i=" + id)
            .map(this.extractData)
            .catch(this.handleError);

    }
    getMovie():Movie[]{
        return this.movieHistory;
    }
    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}

