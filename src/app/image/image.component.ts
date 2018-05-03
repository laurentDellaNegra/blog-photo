import { Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements AfterViewInit {

  @Input() url: string;
  @Input() clazz: string;
  @Input() altText: string;
  @ViewChild('img') el: ElementRef;
  isLoaded = false;

  constructor(private rd: Renderer2,
    public progress: NgProgress) { }

  ngAfterViewInit() {
    this.el.nativeElement.onload = () => {
      this.isLoaded = true;
      this.progress.complete();
    };
  }

}
