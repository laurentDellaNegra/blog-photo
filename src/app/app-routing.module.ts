import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'administration', component: AdministrationComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: 'album/:id', component: AlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
