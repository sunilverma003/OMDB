import {Component, OnInit} from '@angular/core';
import { Movie } from '../../models/index'
import {HttpMovieService} from '../../services/httpmovie.service'

@Component({
    selector: 'movie-list',
    template: require('./movielist.component.1.html')
})

export class MovieListComponent1 implements OnInit {
    public movies: any[] = [];
       public movie : Movie;
    constructor(private _movieService: HttpMovieService) { }

    ngOnInit() {
        this.movie = new Movie();
        this.getMovieById();
    }



    getMovieById() {
        this._movieService.getMovieById("2").subscribe(res => {this.movies = res});
    }
}
