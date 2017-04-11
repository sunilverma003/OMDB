import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Comment} from '../../models/index';
import {MovieService} from '../../services/index';

@Component({
    selector: 'comment-add',
    template: require('./comment.add.component.html')
})
export class CommentAddComponent {
    private movieComment: Comment;
    private movieId: string;
    constructor(private router: Router, private activatedRoute: ActivatedRoute,
        private movieService: MovieService, private locatoin: Location) {
        this.movieComment = new Comment();
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: any) => {
            this.movieId = params.imdbID;
        });
    }

    addComment(comment: Comment) {
        if (Object.keys(comment).length > 0) {
            this.movieComment.id = this.movieId;
            this.movieService.addComment(this.movieComment);
        }
        this.locatoin.back();
    }

    onCancel() {
        this.locatoin.back();
    }
}