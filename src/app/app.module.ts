// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// 3rd party modules
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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Services
import { AlbumsService } from './services/albums.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    AdministrationComponent,
    AuthenticationComponent,
    AlbumsComponent,
    AlbumComponent,
    PageNotFoundComponent
  ],
  providers: [AlbumsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
