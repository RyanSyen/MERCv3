import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/productservice';
import { Product } from '../../../domain/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-product-details',
  templateUrl: './main-product-details.component.html',
  styleUrls: ['./main-product-details.component.scss'],
  styles: [`
  .light-blue-backdrop {
    background-color: #5cb3fd !important;
  }
  `]
})
export class MainProductDetailsComponent implements OnInit {
  product: any;
  productId: any;
  productType: any;

  MainColor: any;
  SubColor0: any;
  SubColor1: any;


  constructor(private _Activatedroute: ActivatedRoute, private productService: ProductService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    // Method 1
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      this.productType = params.get('type');
    })

    // Method 2 -> not sure why using optional or query parameters not working
    // this._Activatedroute.queryParamMap
    //   .subscribe(params => {
    //     this.productId = params.get('id');
    //     this.productType = params.get('type');
    //   });
    // this.productId = this._Activatedroute.snapshot.queryParamMap.get('id');
    // this.productType = this._Activatedroute.snapshot.queryParamMap.get('type');
    // this.productId = this._Activatedroute.snapshot.queryParamMap.get('id');
    // this.productType = this._Activatedroute.snapshot.queryParamMap.get('type');
    // this._Activatedroute.paramMap.subscribe(params => {
    //   this.productId = params.get('id');
    //   this.productType = params.get('type');
    // })

    // get products data based on id passed
    this.productService.getAllProducts().then(products => {
      this.product = products.find(x => x.id === this.productId);
        // define colors for product1
      this.MainColor = ['circle', this.product.color0, 'active'];
      this.SubColor0 = ['circle', this.product.color1];
      this.SubColor1 = ['circle', this.product.color2];
      console.log(this.product);
      console.log(this.product.name);
    });
  }

  // open modal with custom back drop class
  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }


  // define product images for product1
  mainImg = 'active';
  subImg0 = '';
  subImg1 = '';
  


  // method to change color and image
  changeColor(color: string) {
    if (color == this.product.color0) {
      // change active color
      this.MainColor = ['circle', this.product.color0, 'active'];
      this.SubColor0 = ['circle', this.product.color1];
      this.SubColor1 = ['circle', this.product.color2];
      // change active image
      this.mainImg = 'active';
      this.subImg0 = '';
      this.subImg1 = '';
    } else if (color == this.product.color1) {
      this.MainColor = ['circle', this.product.color0];
      this.SubColor0 = ['circle', this.product.color1, 'active'];
      this.SubColor1 = ['circle', this.product.color2];
      this.mainImg = '';
      this.subImg0 = 'active';
      this.subImg1 = '';
    } else if (color == this.product.color2) {
      this.MainColor = ['circle', this.product.color0];
      this.SubColor0 = ['circle', this.product.color1];
      this.SubColor1 = ['circle', this.product.color2, 'active'];
      this.mainImg = '';
      this.subImg0 = '';
      this.subImg1 = 'active';
    }
  }

}
