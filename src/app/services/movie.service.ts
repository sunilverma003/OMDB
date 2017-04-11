import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import { HttpRestApiHelper } from './http.rest.helper';
import {Movie, Comment} from '../models/index';

@Injectable()
export class MovieService {
    private movieHistory: Movie[] = [];
    //private commentMap = new Map<string,string>();
    private comments: Comment[] = [];
    constructor(private _httpRestApiHelper: HttpRestApiHelper) {

    }

    getAllMovieList(): Promise<any> {
        return this._httpRestApiHelper.get("http://www.omdbapi.com/?s=Batman")
            .then((response) => {
                return response;
            })
    }

    getMovieById(id: string): Promise<Response> {
        return this._httpRestApiHelper.get("http://www.omdbapi.com/?i=" + id)
            .then((response) => {
                return response;
            })
    }

    addMovie(movie: Movie) {
        if (movie) {
            movie.TimeOfSearch = new Date();
            this.movieHistory.push(movie);
        }
    }

    getMovie(): Movie[] {
        return this.movieHistory;
    }

    clearHistory(): Movie[] {
        while (this.movieHistory.length) {
            this.movieHistory.pop();
        }
        return this.movieHistory;
    }

    addComment(movieComment: Comment) {
        if (movieComment) {
            movieComment.timeOfComment = new Date();
            this.comments.push(movieComment);
        }
    }

    getComment() {
        return this.comments;
    }
}
