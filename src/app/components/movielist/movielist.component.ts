import {Component, OnInit, Input} from '@angular/core';
import { Movie } from '../../models/index'
import {MovieService} from '../../services/movie.service'

@Component({
    selector: 'movie-list',
    template: require('./movielist.component.html')
})

export class MovieListComponent implements OnInit {
     public movies: Movie[] = [];
     public movie : Movie;
    constructor(private _movieService: MovieService) { }

    ngOnInit() {
         this.movie = new Movie();
        this.getMovieList();
    }

    addMovie(movie:Movie){
        this.movies.push(movie);
    }

    getMovieList() {
        this._movieService.getAllMovieList()
            .then((response) => {
                this.movies = response.Search;
            }, (error: any) => {
                console.log("errors :" + error);
            });
    }
}
