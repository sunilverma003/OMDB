import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/index'
import { MovieService } from '../../services/index';

@Component({
    selector: 'movie-tile',
    template: require('./movie.tile.component.html')
})

export class MovieTileComponent {

    @Input()
    movieInput: Movie;
    constructor(private _router: Router, private movieService:MovieService) { }

    onClick() {
        this.movieService.addMovie(this.movieInput);
        this._router.navigate(['moviedetail/'+this.movieInput.imdbID]);
    }
}
