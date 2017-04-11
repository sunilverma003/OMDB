import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/index';
import { Movie } from '../../models/index';

@Component({
    selector: 'history',
    template: require('./history.component.html')
})

export class HistoryComponent implements OnInit{
    public movieHistory:Movie[] = [];
    public movie:Movie;
    constructor(private movieService:MovieService){}

    ngOnInit(){
        this.movie = new Movie();
        this.movie.Title = "Test abc";
        this.movie.Poster ="test poster";
        this.movieHistory = this.movieService.getMovie();
    }
  

    deleteHistory(){
       this.movieHistory = this.movieService.clearHistory();
    }
}
