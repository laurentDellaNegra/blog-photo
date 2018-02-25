import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { UserComponent } from './user/user.component';
import { AlbumComponent } from './album/album.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    AlbumsComponent,
    UserComponent,
    AlbumComponent
  ]
})
export class AdminModule { }
