import { Component } from '@angular/core';
// import { Tween } from 'jquery';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseCRUDService } from './service/firebasecrudservice';
import { ProductService } from './service/productservice';
import { TweenMax } from "gsap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MERCv3';

  product: any;
  items: any;
  count !: number;

  constructor(private primengConfig: PrimeNGConfig, private firebasecrudservice: FirebaseCRUDService, private productService: ProductService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    // * set cart 
    // this.productService.getCartItems().then(items => {
    //   this.items = items;
    //   this.count = items.length;

    //   for (let i = 0; i < this.count; i++) {
    //     this.firebasecrudservice.setCart(this.items[i]);
    //   }
    // });

    // * get all products data 
    // this.productService.getAllProducts().then(products => {
    //   this.product = products;
    //   this.count = products.length;

    //   // populate all products from (products.json) to firebase (one time populate)
    //   for (let i = 0; i < this.count; i++){
    //     this.firebasecrudservice.setProductsFromAllProducts(this.product[i]);
    //     // alert('product added to firebase')
    //   }
    // });


    // * get discounted products data
    // this.productService.getDiscountedProducts().then(products => {
    //   this.product = products;
    //   this.count = products.length;

    //   // populate all discounted products to firebase
    //   for (let i = 0; i < this.count; i++){
    //     this.firebasecrudservice.setProductsFromDiscountedProducts(this.product[i]);
    //     // alert('product added to firebase')
    //   }
    // });

    // * get gallery images

    //gsap not working with angular
    // const cursor = document.querySelector(".cursor");

    // var posX = 0, posY = 0, mouseX = 0, mouseY = 0;

    // TweenMax.to{}, 0.016, {
    //   repeat: -1,
    //   onRepeat: function() {
    //     posX += (mouseX - posX / 9);
    //     posY += (mouseY - posY / 9);

    //     TweenMax.set(cursor, {
    //       css: {
    //         left: posX - 12,
    //         top: posY - 12,
    //       },
    //     });

    //   },
    // };

  }
}
