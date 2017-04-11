import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {MovieListComponent,HistoryComponent,MovieTileComponent, MovieDetailComponent,
    CommentAddComponent} from './components';
import {MovieService, HttpRestApiHelper} from './services/index';
import {HttpMovieService } from './services/httpmovie.service';
import { SearchPipe, OrderByPipe } from './common/index';

@NgModule({
    declarations: [
        AppComponent,
        MovieListComponent,
        HistoryComponent,
        MovieTileComponent,
        MovieDetailComponent,
        CommentAddComponent,
        OrderByPipe,
        SearchPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        Ng2SearchPipeModule
    ],
    providers: [appRoutingProviders,MovieService,HttpMovieService,HttpRestApiHelper],
    bootstrap: [AppComponent]
})

export class AppModule {
}
