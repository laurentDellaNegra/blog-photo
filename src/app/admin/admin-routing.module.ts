import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from '../services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuardService],
        children: [
          { path: 'albums', component: AlbumsComponent },
          { path: 'album/:id', component: AlbumComponent },
          { path: 'user', component: UserComponent },
          { path: '', component: AlbumsComponent }
          // { path: '', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
