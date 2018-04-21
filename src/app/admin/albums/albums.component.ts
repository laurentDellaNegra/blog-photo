import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AlbumsAdminService } from '../shared/albums-admin.service';
import { AlbumsService } from '../../shared/albums.service';

import { Album } from '../../shared/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  public albums$: Observable<any>;
  closeResult: string;
  newAlbumName: string;
  albumNameToDelete: string;

  constructor(
    public route: ActivatedRoute,
    public albumsService: AlbumsService,
    public albumsAdminService: AlbumsAdminService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.albums$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.albumsService.getAlbums()
      );
  }

  addAlbum(content): void {
    this.openModal(content).then((result) => {
      // TODO: add
      this.albumsAdminService.addAlbum(this.newAlbumName);

      this.closeResult = `Album aoujté: ${this.newAlbumName}`;
      this.newAlbumName = '';
    }).catch((reason) => {
      console.log('Dismissed ' + this.getDismissReason(reason));
      this.closeResult = '';
      this.newAlbumName = '';
    });
  }

  deleteAlbum(id: number, album: Album, content: any): void {
    this.albumNameToDelete = album.name;
    this.openModal(content)
      .then((result) => {
        return this.albumsAdminService.deleteAlbum(album);
      })
      .then(() => {
        this.closeResult = `Album supprimé: ${this.albumNameToDelete}`;
        this.albumNameToDelete = '';
      })
      .catch((reason) => {
        console.log('Dismissed ' + this.getDismissReason(reason));
        this.closeResult = '';
        this.albumNameToDelete = '';
      });
  }

  private openModal(content): Promise<any> {
    return this.modalService.open(content).result;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
