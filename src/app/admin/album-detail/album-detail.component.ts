import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

import { Album } from '../../model/Album';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

  album: Album;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.route.data.subscribe((data: { album: Album }) => {
      this.album = { ...data.album };
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }

}
