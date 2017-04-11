import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpMovieService} from '../../services/httpmovie.service'

import {Location} from '@angular/common';

@Component({
    selector: "movie-detail",
    template: require('./movie.detail.component.html')
})

export class MovieDetailComponent1 implements OnInit {
    private movieDetail: any = {};

    constructor(private movieService:HttpMovieService) { }

    ngOnInit() {
            let movieId = "3";
            this.getMovieById(movieId);
        };
    
    getMovieById(id: string) {
      this.movieService.getMovieById("2").subscribe(res => {this.movieDetail = res});
    }
};