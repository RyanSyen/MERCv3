import { Component } from '@angular/core';
// import { Tween } from 'jquery';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseCRUDService } from './service/firebasecrudservice';
import { ProductService } from './service/productservice';
import { TweenMax } from "gsap";
import { Voucher } from './domain/voucher';
import { selectedVoucher } from './domain/selectedVoucher';


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

  voucher: Voucher[] = [
    {
      title: "RM 50 off",
      min: 500,
      cashback: 0,
      freeShipping: false,
      discount: 50,
      type: "discount"
    },

    {
      title: "Free shipping",
      min: 500,
      cashback: 0,
      freeShipping: true,
      discount: 0,
      type: "free shipping"
    },

    {
      title: "Cashback 15%",
      min: 100,
      cashback: 15,
      freeShipping: false,
      discount: 0,
      type: "cash back"
    }
  ]

  selectedVoucher: selectedVoucher[] = [
    {
      id: "v001",
      voucher1: "",
      voucher2: "",
      voucher3: ""
    },
    {
      id: "v002",
      voucher1: "",
      voucher2: "",
      voucher3: ""
    },
    {
      id: "v003",
      voucher1: "",
      voucher2: "",
      voucher3: ""
    }
  ]

  ngOnInit() {
    this.primengConfig.ripple = true;

    // * set cart 
    this.productService.getCartItems().then(items => {
      this.items = items;
      this.count = items.length;

      for (let i = 0; i < this.count; i++) {
        // this.firebasecrudservice.setCart(this.items[i]);
        // this.firebasecrudservice.populateWithFirebaseTSFirestore(this.items[i]);
      }
    });

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

    //* Populate voucher
    // 1. RM 5 off Min.Spend RM 15
    // 2. Free shipping Min.Spend RM 50
    // 3. Cashback 15% Min.Spend RM 25

    // this.voucher.forEach(element => {
    //   this.firebasecrudservice.populateVoucher(element);
    // });

    //* populate selectedVoucher
    // this.selectedVoucher.forEach(element => {
    //   this.firebasecrudservice.setSelectedVouchers(element);
    // })

  }
}
