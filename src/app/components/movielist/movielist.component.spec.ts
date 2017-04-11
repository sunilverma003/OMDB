// import {TestBed,  async,  tick, inject, ComponentFixture} from '@angular/core/testing';
// import {
//     MockBackend,
//     MockConnection
// } from '@angular/http/testing';
// import {
//     HttpModule, Http, XHRBackend, Response, ResponseOptions
// } from '@angular/http';
// import { FormsModule } from '@angular/forms';
// import { By, BrowserModule } from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';
// import { MovieListComponent1 } from './movielist.component.1';
// import { MovieTileComponent } from '../movietile/movie.tile.component';
// import {SearchPipe} from '../../common/index';
// import { Movie } from '../../models/index';
// import {HttpMovieService} from '../../services/httpmovie.service';

// describe('MovieListComponent', () => {
//     let comp: MovieListComponent1;
//     let movieService: HttpMovieService;
//     let fixture: ComponentFixture<MovieListComponent1>;
//     let de: DebugElement;
//     let el: HTMLElement;
//         let backend: MockBackend;

//         let response: Response;
//     const makeMovieData = () => [
//     { Title: "Some cinema1", Type: "TYpe cinem", Year : "2015" },
//     { Title: "Some cinema", Type: "TYpe cinem", Year: "2000"}

// ]   as Movie[];

//   let fakeMovies: any[];
//     beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) =>  {
       
    

//             backend = be;
//            movieService = new HttpMovieService(http);
//             fakeMovies = makeMovieData();
//             let options = new ResponseOptions({ status: 200, body: { data: fakeMovies } });
//             response = new Response(options);

//         fakeMovies = makeMovieData();
//         TestBed.configureTestingModule({
//             imports: [ BrowserModule, FormsModule , HttpModule],
//             declarations: [MovieListComponent1, SearchPipe, MovieTileComponent],
//             providers: [HttpMovieService, { provide: XHRBackend, useValue: MockBackend }]
//         });

//         fixture = TestBed.createComponent(MovieListComponent1);
//       //   fixture.detectChanges();
//         comp = fixture.componentInstance;
//        // movieService = TestBed.get(HttpMovieService);

//     }));

//     it('should instantiate the MovieListComponentqqqqqqqqqqq', () => {
//         expect(fixture.componentInstance instanceof MovieListComponent1).toBe(true, 'should create MovieListComponent');
//     });


//     // it('should have called  getmvie spy',inject([Http], (http: Http) => {
//     //  //  tick();
//     //    fixture.detectChanges();
//     //     el = fixture.debugElement.nativeElement;
//     //    expect(el.querySelectorAll('h1').length).toBe(1);

//     // }));


    
//     //     it('should be returning title of the first movie', async(inject([], () => {
//     //         backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
//     //         movieService.getMovieById("2")
//     //             .do(movies => {
//     //                 expect(movies[0].Title).toBe("Some cinema1");
//     //             }).toPromise();
                
//     //   fixture.componentInstance.ngOnInit();

//     //   fixture.detectChanges();
               
//     //     })));

// });



import {TestBed,  async,  tick, inject, ComponentFixture } from '@angular/core/testing';



import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';
import {
  fakeAsync

} from '@angular/core/testing';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Movie } from '../../models/index';
import { MovieListComponent1 } from './movielist.component.1'
import { MovieTileComponent1 } from '../movietile/movie.tile.component.1';
import {SearchPipe} from '../../common/index';
import {HttpMovieService} from '../../services/httpmovie.service';

describe('MovielistComponent', () => {
    let comp: MovieListComponent1;
    let movieService: HttpMovieService;
    let fixture: ComponentFixture<MovieListComponent1>;
    let de: DebugElement;
    let el: HTMLElement;
      let backend: MockBackend;

        let response: Response;
    const makeMovieData = () => [
    { Title: "Some cinema1", Type: "TYpe cinem", Year : "2015" },
    { Title: "Some cinema", Type: "TYpe cinem", Year: "2000"}

]   as Movie[];

  let fakeMovies: any[];

    // beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
    //         backend = be;
    //         movieService = new HttpMovieService(http);
    //         fakeMovies = makeMovieData();
    //         let options = new ResponseOptions({ status: 200, body: { data: fakeMovies } });
    //         response = new Response(options);
    //     }));

        
    beforeEach(() => {
       fakeMovies = makeMovieData();
           TestBed.configureTestingModule({
            imports: [ BrowserModule, FormsModule ,HttpModule],
        
            declarations: [MovieListComponent1, MovieTileComponent1,SearchPipe],
           
              providers: [
                HttpMovieService,      { provide: XHRBackend, useClass: MockBackend }
            ]
        });

        fixture = TestBed.createComponent(MovieListComponent1);
        comp = fixture.componentInstance;
       movieService = fixture.debugElement.injector.get(HttpMovieService);

    });

     it('should instantiate the MovieListComponent',inject([Http], (http: Http) => {
         // let service = new HttpMovieService(http);
        expect(comp instanceof MovieListComponent1).toBe(true, 'should create MovieListComponent');
    }));



    it('should be returning title of the first movie', inject([HttpMovieService, XHRBackend], (httpMovieService:HttpMovieService, mockBackend:MockBackend) => {
      let options = new ResponseOptions({ status: 200, body: { data: fakeMovies } });
         let response: Response;
            response = new Response(options);
             mockBackend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
              movieService.getMovieById("2")
                .do(movies => {
                    expect(movies[0].Title).toBe("Some cinema1");
                }).toPromise();
                
                  fixture.detectChanges();
                 de = fixture.debugElement.query(By.css('h1'));
                 el = de.nativeElement;
                 const content = el.textContent;
                 expect(content).toContain('Some cinema1');
               
        }));
});
