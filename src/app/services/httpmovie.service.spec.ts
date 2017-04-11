import {
    async, inject, TestBed
} from '@angular/core/testing';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import {Movie} from '../models/index';
import { HttpMovieService as MovieService } from './httpmovie.service';


const makeMovieData = () => [
    { Title: "Some cinema1", Type: "TYpe cinem", Year : "2015" },
    { Title: "Some cinema", Type: "TYpe cinem", Year: "2000"}

] as Movie[];

describe('Http-MovieService (mockBackend)', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                MovieService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    it('can instantiate service when inject service',
        inject([MovieService], (service: MovieService) => {
            expect(service instanceof MovieService).toBe(true);
        }));



    it('can instantiate service with "new"', inject([Http], (http: Http) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new MovieService(http);
        expect(service instanceof MovieService).toBe(true, 'new service should be ok');
    }));


    it('can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    describe('when getAllMovies', () => {
        let backend: MockBackend;
        let service: MovieService;
        let fakeMovies: Movie[];
        let response: Response;

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            backend = be;
            service = new MovieService(http);
            fakeMovies = makeMovieData();
            let options = new ResponseOptions({ status: 200, body: { data: fakeMovies } });
            response = new Response(options);
        }));

        it('should have expected fake movies (then)', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getAllMovies().toPromise()
                // .then(() => Promise.reject('deliberate'))
                .then(movies => {
                    expect(movies.length).toBe(fakeMovies.length,
                        'should have expected no. of movies');
                });
        })));

        it('should have expected fake movies (Observable.do)', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getAllMovies()
                .do(movies => {
                    expect(movies.length).toBe(fakeMovies.length,
                        'should have expected no. of movies');
                })
                .toPromise();
        })));


        it('should be OK returning no movies', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 200, body: { data: [] } }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.getAllMovies()
                .do(movies => {
                    expect(movies.length).toBe(0, 'should have no movies');
                })
                .toPromise();
        })));

        it('should treat 404 as an Observable error', async(inject([], () => {
            let resp = new Response(new ResponseOptions({ status: 404 }));
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

            service.getAllMovies()
                .do(movies => {
                    fail('should not respond with movies');
                })
                .catch(err => {
                    expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
                    return Observable.of(null); // failure is the expected test result
                })
                .toPromise();
        })));

        it('should be returning title of the first movie', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
            service.getAllMovies()
                .do(movies => {
                    expect(movies[0].Title).toBe("Some cinema1");
                }).toPromise();
               
        })));
    });
});

