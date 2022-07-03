import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { PhotoService } from '../../../service/photoservice';
import { Galleria } from 'primeng/galleria';
import { Image } from '../../../domain/image';


@Component({
  selector: 'app-product-details-gallery',
  templateUrl: './product-details-gallery.component.html',
  styleUrls: ['./product-details-gallery.component.scss']
})
export class ProductDetailsGalleryComponent implements OnInit {

  firstProductImages!: Image[];
  secondProductImages!: Image[];
  thirdProductImages!: Image[];


  @Input() activeImage!: number;

  @Output() imgChanged: EventEmitter<number> = new EventEmitter();

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

    // if (this.activeImage == 1) {
    //   // get first product images
    //   this.imageService.getFirstProductImages().then(images => {
    //     this.images = images;
    //     console.log(this.activeImage);
    //     alert(1)
    //   });
    // } else if(this.activeImage == 2){
    //   // get second product images
    //   this.imageService.getSecondProductImages().then(images => {
    //     this.images = images;
    //     console.log(this.activeImage)
    //     alert(2)
    //   });
    // } else if(this.activeImage == 3){
    //   // get third product images
    //   this.imageService.getThirdProductImages().then(images => {
    //     this.images = images;
    //     console.log(this.activeImage)
    //     alert(3)
    //   });
    // }

    // get first product images
    this.imageService.getFirstProductImages().then(images => {
      this.firstProductImages = images;
    });

    // get second product images
    this.imageService.getSecondProductImages().then(images => {
      this.secondProductImages = images;
    });

    // get third product images
    this.imageService.getThirdProductImages().then(images => {
      this.thirdProductImages = images;
    });
  }
}
