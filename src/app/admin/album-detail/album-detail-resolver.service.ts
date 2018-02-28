import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

// TODO: use admin service
import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../model/Album';

@Injectable()
export class AlbumDetailResolver implements Resolve<Album> {
  constructor(private albumService: AlbumsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> {
    const id = route.paramMap.get('id');

    return this.albumService.getAlbum(id).take(1).map(album => {
      if (album) {
        return album;
      } else { // id not found
        this.router.navigate(['/admin/albums']);
        return null;
      }
    });
  }
}
