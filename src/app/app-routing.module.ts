import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
