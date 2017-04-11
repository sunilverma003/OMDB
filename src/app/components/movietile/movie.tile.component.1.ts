import {Component, Input} from '@angular/core';
import { Movie } from '../../models/index'
import { HttpMovieService } from '../../services/httpmovie.service';

@Component({
    selector: 'movie-tile',
    template: require('./movie.tile.component.1.html')
})

export class MovieTileComponent1 {

    @Input()
    movieInput1: Movie;
    constructor(private movieService:HttpMovieService) { }

    onClick() {
        this.movieService.addMovie(this.movieInput1);
      //  this._router.navigate(['movie/detail', { "imdbID": this.movieInput.imdbID }]);
    }
}
