import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/index';
import {Location} from '@angular/common';
import {Comment} from '../../models/index';

@Component({
    selector: "movie-detail",
    template: require('./movie.detail.component.html')
})

export class MovieDetailComponent implements OnInit {
    private movieDetail: any = {};
    private movieId:string;
    private comments:Comment[]=[];

    constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService, private location: Location,
    private router:Router) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.movieId = params.imdbID;
            this.getMovieById(this.movieId);
        });
        this.getComment();
    }

   
    getMovieById(id: string) {
        this.movieService.getMovieById(id)
            .then((response) => {
                this.movieDetail = response;
            }, (error) => {
                console.log(`Errors => ${error}`);
            })
    }

    back() {
        this.location.back();
    }

    addComment(){
        this.router.navigate(['/commentadd/'+this.movieId]);
    }

    getComment(){
        this.comments = this.movieService.getComment();
    }
}