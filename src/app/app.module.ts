import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Component
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';

// Services
import { AlbumsService } from './services/albums.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdministrationComponent,
    AuthenticationComponent,
    AlbumsComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [AlbumsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
