import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { UserComponent } from './user/user.component';
import { AuthGuardService } from '../services/auth-guard.service';

import { AlbumDetailResolver } from './album-detail/album-detail-resolver.service';

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
          { path: 'album-detail/:id', component: AlbumDetailComponent, resolve: { album: AlbumDetailResolver } },
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
  ],
  providers: [
    AlbumDetailResolver
  ]
})
export class AdminRoutingModule { }
