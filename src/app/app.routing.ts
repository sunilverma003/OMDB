import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MovieListComponent, HistoryComponent, MovieDetailComponent,
    CommentAddComponent} from './components/index';

const appRoutes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'movie', component: MovieListComponent },
    { path: 'history', component: HistoryComponent },
    {
        path: 'moviedetail/:imdbID', component: MovieDetailComponent
    },
    { path: 'commentadd/:imdbID',component:CommentAddComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
