import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration/administration.component';
import { PhotosComponent } from './photos/photos.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'authentication', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
