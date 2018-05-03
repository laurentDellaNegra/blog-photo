import { Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';

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

  constructor(private rd: Renderer2) { }

  ngAfterViewInit() {
    this.el.nativeElement.onload = () => this.isLoaded = true;
  }

}
