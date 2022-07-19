import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../service/productservice';
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';

@Component({
  selector: 'app-product-details-accordion',
  templateUrl: './product-details-accordion.component.html',
  styleUrls: ['./product-details-accordion.component.scss']
})
export class ProductDetailsAccordionComponent implements OnInit {
  productDetails: any;
  productId: any;
  highlights!: boolean;
  productDescriptionSpecs!: boolean;
  documentsDownloads!: boolean;
  box!: boolean;
  details!: boolean;



  constructor(private _Activatedroute: ActivatedRoute, private router: Router, private firebasecrudservice: FirebaseCRUDService, private productService: ProductService) { }




  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      // console.log(this.productId)
    })

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.productService.getAllProductsDetails().then(products => {
      this.productDetails = products.find(x => x.id === this.productId); 
      // console.log(this.productDetails);
      // console.log(this.productDetails.docdownloadHeader);
    });

    // get products data based on id passed from firebase 
    this.firebasecrudservice.getProductByIDFromAllProducts(this.productId).subscribe(res => {
      // this.product = res;
      // this.productLogo = res.logo;
      // this.productName = res.name;
      // this.productDescription = res.description;
      // this.productImg1 = res.image1;
      // this.productImg2 = res.image2;
      // this.productImg3 = res.image3;
      // this.color0 = res.color0;
      // this.color1 = res.color1;
      // this.color2 = res.color2;
      // this.oldPrice = res.oldPrice;
      // this.discountedPrice = res.discountedPrice;
      // this.category = res.category;
      // this.sold = res.sold;
      // this.gallery = res.gallery;
      this.highlights = res.highlights;
      this.productDescriptionSpecs = res.productDescriptionSpecs;
      this.documentsDownloads = res.documentsDownloads;
      this.box = res.box;
      this.details = res.details;
    })
  }

}
