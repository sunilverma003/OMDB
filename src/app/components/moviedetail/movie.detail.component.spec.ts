import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { MockBackend  } from '@angular/http/testing';
import { HttpModule, Http} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Movie } from '../../models/index';
import { MovieDetailComponent1 } from './movie.detail.component.1'
import { SearchPipe } from '../../common/index';
import { HttpMovieService } from '../../services/httpmovie.service';

describe('MovieDetailComponent', () => {
    let comp: MovieDetailComponent1;
    let movieService: HttpMovieService;
    let fixture: ComponentFixture<MovieDetailComponent1>;
    let de: DebugElement;
    let el: HTMLElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, HttpModule],

            declarations: [MovieDetailComponent1, SearchPipe],
            providers: [{ provide: HttpMovieService, useValue: MockBackend }]
        });

        fixture = TestBed.createComponent(MovieDetailComponent1);
        comp = fixture.componentInstance;
        movieService = fixture.debugElement.injector.get(HttpMovieService);
    });

    it('should instantiate the MovieListComponent', () => {
        expect(comp instanceof MovieDetailComponent1).toBe(true, 'should create MovieListComponent');
    });

    it('should have called  getmvie spy', inject([Http], (http: Http) => {
        el = fixture.debugElement.nativeElement;
        expect(el.querySelectorAll('span').length).toBe(10);
    }));

});
