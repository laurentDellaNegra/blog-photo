import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AdminComponent } from './admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { UserComponent } from './user/user.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AdminRoutingModule } from './admin-routing.module';

import { UploadService } from './shared/upload.service';
import { AlbumsAdminService } from './shared/albums-admin.service';
import { ConvertImageService } from './shared/convert-image.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AngularFireStorageModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    AlbumsComponent,
    UserComponent,
    AlbumDetailComponent
  ],
  providers: [
    UploadService,
    AlbumsAdminService,
    ConvertImageService
  ]
})
export class AdminModule { }
