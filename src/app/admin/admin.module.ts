import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { UserComponent } from './user/user.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AdminRoutingModule } from './admin-routing.module';

import { UploadService } from './shared/upload.service';
import { AlbumAdminService } from './shared/album-admin.service';
import { ConvertImageService } from './shared/convert-image.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    AdminRoutingModule,
    AngularFireStorageModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    AlbumListComponent,
    UserComponent,
    AlbumDetailComponent
  ],
  providers: [
    UploadService,
    AlbumAdminService,
    ConvertImageService
  ]
})
export class AdminModule { }
