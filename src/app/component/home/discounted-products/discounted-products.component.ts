import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/productservice';
import { Product } from '../../../domain/product';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-discounted-products',
  templateUrl: './discounted-products.component.html',
  styleUrls: ['./discounted-products.component.scss']
})
export class DiscountedProductsComponent implements OnInit {

  discountedProducts: Product[] = [];
  productColor0: any;
  productColor1: any;
  productColor2: any;
  responsiveOptions;

  constructor(private productService: ProductService, private router: Router) {
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

  ngOnInit(): void {
    this.productService.getDiscountedProducts().then(products => {
      this.discountedProducts = products;
      // console.log(this.discountedProducts);
    });
  }

  // !!! The drawback of using this method to toggle and retreive the color is a static way and if we try to change the color variant from the data json file, then it will not work since all the colors are statically placed and styled. Due to time, I will proceeed with a static method first

  // define product images for product1
  product1mainImg = 'active';
  product1subImg0 = '';
  product1subImg1 = '';

  // define colors for product1
  product1MainColor = ['circle', 'blue', 'active'];
  product1SubColor0 = ['circle', 'pink'];
  product1SubColor1 = ['circle', 'yellow'];

  // define product images for product1
  product2mainImg = 'active';
  product2subImg0 = '';
  product2subImg1 = '';

  // define colors for product2
  product2MainColor = ['circle', 'black', 'active'];
  product2SubColor0 = ['circle', 'blue'];
  product2SubColor1 = ['circle', 'white'];

  // define product images for product1
  product3mainImg = 'active';
  product3subImg0 = '';
  product3subImg1 = '';

  // define colors for product3
  product3MainColor = ['circle', 'burgundy', 'active'];
  product3SubColor0 = ['circle', 'green'];
  product3SubColor1 = ['circle', 'white'];

  // method to change color and image
  changeColor(color: string, id: string) {
    // change the active image based on product id
    if (id == "1000") {
      this.productColor0 = this.discountedProducts.find(x => x.id === id)!.color0;
      this.productColor1 = this.discountedProducts.find(x => x.id === id)!.color1;
      this.productColor2 = this.discountedProducts.find(x => x.id === id)!.color2;
      if (color == this.productColor0) {
         // change active color
        this.product1MainColor = ['circle', 'blue', 'active'];
        this.product1SubColor0 = ['circle', 'pink'];
        this.product1SubColor1 = ['circle', 'yellow'];
        // change active image
        this.product1mainImg = 'active';
        this.product1subImg0 = '';
        this.product1subImg1 = '';
      } else if (color == this.productColor1) {
        this.product1MainColor = ['circle', 'blue'];
        this.product1SubColor0 = ['circle', 'pink', 'active'];
        this.product1SubColor1 = ['circle', 'yellow'];
        this.product1mainImg = '';
        this.product1subImg0 = 'active';
        this.product1subImg1 = '';
      } else if (color == this.productColor2) {
        this.product1MainColor = ['circle', 'blue'];
        this.product1SubColor0 = ['circle', 'pink'];
        this.product1SubColor1 = ['circle', 'yellow', 'active'];
        this.product1mainImg = '';
        this.product1subImg0 = '';
        this.product1subImg1 = 'active';
      }
    } else if (id == "1001") {
      this.productColor0 = this.discountedProducts.find(x => x.id === id)!.color0;
      this.productColor1 = this.discountedProducts.find(x => x.id === id)!.color1;
      this.productColor2 = this.discountedProducts.find(x => x.id === id)!.color2;
      if (color == this.productColor0) {
        this.product2MainColor = ['circle', 'black', 'active'];
        this.product2SubColor0 = ['circle', 'blue'];
        this.product2SubColor1 = ['circle', 'white'];
        this.product2mainImg = 'active';
        this.product2subImg0 = '';
        this.product2subImg1 = '';
      } else if (color == this.productColor1) {
        this.product2MainColor = ['circle', 'black'];
        this.product2SubColor0 = ['circle', 'blue', 'active'];
        this.product2SubColor1 = ['circle', 'yellow'];
        this.product2mainImg = '';
        this.product2subImg0 = 'active';
        this.product2subImg1 = '';
      } else if (color == this.productColor2) {
        this.product2MainColor = ['circle', 'black'];
        this.product2SubColor0 = ['circle', 'blue'];
        this.product2SubColor1 = ['circle', 'white', 'active'];
        this.product2mainImg = '';
        this.product2subImg0 = '';
        this.product2subImg1 = 'active';
      }
    } else if (id == "1002") {
      this.productColor0 = this.discountedProducts.find(x => x.id === id)!.color0;
      this.productColor1 = this.discountedProducts.find(x => x.id === id)!.color1;
      this.productColor2 = this.discountedProducts.find(x => x.id === id)!.color2;
      if (color == this.productColor0) {
        this.product3MainColor = ['circle', 'burgundy', 'active'];
        this.product3SubColor0 = ['circle', 'green'];
        this.product3SubColor1 = ['circle', 'white'];
        this.product3mainImg = 'active';
        this.product3subImg0 = '';
        this.product3subImg1 = '';
      } else if (color == this.productColor1) {
        this.product3MainColor = ['circle', 'burgundy'];
        this.product3SubColor0 = ['circle', 'green', 'active'];
        this.product3SubColor1 = ['circle', 'white'];
        this.product3mainImg = '';
        this.product3subImg0 = 'active';
        this.product3subImg1 = '';
      } else if (color == this.productColor2) {
        this.product3MainColor = ['circle', 'burgundy'];
        this.product3SubColor0 = ['circle', 'green'];
        this.product3SubColor1 = ['circle', 'white', 'active'];
        this.product3mainImg = '';
        this.product3subImg0 = '';
        this.product3subImg1 = 'active';
      }
    }
  }

  navigateToProductDetails(id : string, type : any){
    // Method 1 -> provide both path and the route parameter (as second element)
    this.router.navigate(['/product_details/',id, type]);

    // Method 2 -> using query parameters (not sure why not working)
    // this.router.navigate(['/product_details]', {queryParams: {id: id, type: type}}]);
  }

  addToCart(id:string){
    this.router.navigate(['/cart/',id]);
  }

}
