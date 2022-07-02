import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PhotoService } from '../../../service/photoservice';
import { Galleria } from 'primeng/galleria';
import { Image } from '../../../domain/image';


@Component({
  selector: 'app-product-details-gallery',
  templateUrl: './product-details-gallery.component.html',
  styleUrls: ['./product-details-gallery.component.scss']
})
export class ProductDetailsGalleryComponent implements OnInit {

  images!: Image[];

  responsiveOptions;

  constructor(private imageService: PhotoService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.imageService.getImages().then(images => {
      this.images = images;
      console.log(this.images)
    });
  }
}
