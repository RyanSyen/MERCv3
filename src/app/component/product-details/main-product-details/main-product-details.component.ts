import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../../../service/productservice';
import { Product } from '../../../domain/product';
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Renderer2 } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Cart } from 'src/app/domain/cart';
import { MessageService } from 'primeng/api';
import { AlertModule } from '@coreui/angular';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-main-product-details',
  templateUrl: './main-product-details.component.html',
  styleUrls: ['./main-product-details.component.scss'],
  styles: [`
  .light-blue-backdrop {
    background-color: #5cb3fd !important;
  }
  `],
  providers: [MessageService]
})
export class MainProductDetailsComponent implements OnInit {
  product: any;

  productLogo: string;
  productDescription: string;
  productName: string;
  productImg1: string;
  productImg2: string;
  productImg3: string;
  oldPrice: number;
  discountedPrice: number;
  category: string;
  stock0: number;
  stock1: number;
  stock2: number;
  rating: number;
  sold: number;
  color0: string;
  color1: string;
  color2: string;
  gallery: boolean;

  // variables to get product id and type from param
  productId: any;
  productType: any;

  // define color 
  MainColor: any;
  SubColor0: any;
  SubColor1: any;

  loaderr = true;
  activeImg: number = 1;

  // add to cart
  variations = "";
  quantity = 1;
  subtotal = 0;
  colorOption = "";
  size: any;
  cartItemId = 0;
  image: string = "";

  // toast
  visible = false;
  position = 'top-end';
  percentage = 0;
  name: string = "";
  currentUser: any;


  productID: any;

  private tempObject: Cart[] = [];

  constructor(public authService: AuthService, private _Activatedroute: ActivatedRoute, private productService: ProductService, private router: Router, private modalService: NgbModal, private firebasecrudservice: FirebaseCRUDService, private renderer: Renderer2, private spinner: NgxSpinnerService, private e: ElementRef, private messageService: MessageService) {
    this.currentUser = this.authService.getCurrentUserData();

    this.productLogo = '';
    this.productDescription = '';
    this.productName = '';
    this.productImg1 = '';
    this.productImg2 = '';
    this.productImg3 = '';
    this.oldPrice = 0;
    this.discountedPrice = 0;
    this.category = '';
    this.stock0 = 0;
    this.stock1 = 0;
    this.stock2 = 0;
    this.rating = 0;
    this.sold = 0;
    this.color0 = '';
    this.color1 = '';
    this.color2 = '';
    this.gallery = true;

    window.onbeforeunload = function () { window.scrollTo(0, 0); }
  }



  ngOnInit(): void {
    // Called after the constructor and called  after the first ngOnChanges()

    //* get cart items
    // this.firebasecrudservice.getCart(this.currentUser.email).subscribe((cartItem) => {
    //   if (cartItem != []) {
    //     let size = cartItem.length;
    //     console.log(cartItem)
    //     this.cartItemId = parseInt(cartItem[size - 1].id);
    //     console.log(this.cartItemId)
    //   } else {
    //     this.cartItemId = 0;
    //   }
    // })



    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    setTimeout(() => {
      this.loaderr = false;
      let loader = this.renderer.selectRootElement('#loader');
      this.renderer.setStyle(loader, 'display', 'none');
    }, 2500);

    // Method 1
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      // console.log(typeof this.productId);
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

    // get products data based on id passed (old method -> get data from json file)
    // this.productService.getAllProducts().then(products => {
    //   this.product = products.find(x => x.id === +this.productId); // convert string to int using parseInt or parseFloat or the unary + operator

    //   // define colors for product1
    //   this.MainColor = ['circle', this.product.color0, 'active'];
    //   this.SubColor0 = ['circle', this.product.color1];
    //   this.SubColor1 = ['circle', this.product.color2];
    //   console.log(this.product);
    //   console.log(this.product.name);
    //   console.log(this.product.image1);
    // });

    // get products data based on id passed from firebase 
    this.firebasecrudservice.getProductByIDFromAllProducts(this.productId).subscribe(res => {
      console.log(res)
      this.product = res;
      this.productID = res.id;
      this.productLogo = res.logo;
      this.productName = res.name;
      this.productDescription = res.description;
      this.productImg1 = res.image1;
      this.productImg2 = res.image2;
      this.productImg3 = res.image3;
      this.color0 = res.color0;
      this.color1 = res.color1;
      this.color2 = res.color2;
      this.oldPrice = res.oldPrice;
      this.discountedPrice = res.discountedPrice;
      this.category = res.category;
      this.sold = res.sold;
      this.gallery = res.gallery;

      // define color 
      this.MainColor = ['circle', res.color0, 'active'];
      this.SubColor0 = ['circle', res.color1];
      this.SubColor1 = ['circle', res.color2];
    });





  }


  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');


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
    if (color == this.color0) {
      // change active color
      this.MainColor = ['circle', this.color0, 'active'];
      this.SubColor0 = ['circle', this.color1];
      this.SubColor1 = ['circle', this.color2];
      // change active image
      this.mainImg = 'active';
      this.subImg0 = '';
      this.subImg1 = '';
      this.activeImg = 1;

      this.image = this.productImg1;
      this.colorOption = this.color0;
    } else if (color == this.color1) {
      this.MainColor = ['circle', this.color0];
      this.SubColor0 = ['circle', this.color1, 'active'];
      this.SubColor1 = ['circle', this.color2];
      this.mainImg = '';
      this.subImg0 = 'active';
      this.subImg1 = '';
      this.activeImg = 2;

      this.image = this.productImg2;
      this.colorOption = this.color1;
    } else if (color == this.color2) {
      console.log(this.color2);
      this.MainColor = ['circle', this.color0];
      this.SubColor0 = ['circle', this.color1];
      this.SubColor1 = ['circle', this.color2, 'active'];
      this.mainImg = '';
      this.subImg0 = '';
      this.subImg1 = 'active';
      this.activeImg = 3;

      this.image = this.productImg3;
      this.colorOption = this.color2;
    } else {
      alert('no products found')
    }
  }

  changeSpecs(spec: number) {

    if (spec == 1) {
      this.size = "128 GB | 8 GB";
    } else if (spec == 2) {
      this.size = "256 GB | 12 GB";
    } else if (spec == 3) {
      this.size = "512 GB | 12 GB";
    }

    let t1 = document.getElementById('spec' + 1);
    let t2 = document.getElementById('spec' + 2);
    let t3 = document.getElementById('spec' + 3);



    let el = document.getElementById('spec' + spec);
    if (!el?.classList.contains('selectedSize')) {

      // remove others
      t1?.classList.remove('selectedSize');
      t2?.classList.remove('selectedSize');
      t3?.classList.remove('selectedSize');

      el?.classList.add('selectedSize')
    } else {
      this.size = "";
      el.classList.remove('selectedSize')
    }
  }

  addItemToCart() {
    this.cartItemId++;

    let image = "../../../../assets/img/" + this.image;
    if (this.colorOption == "") {
      this.colorOption = this.color0;
    }
    this.variations = "size: " + this.size + " color: " + this.colorOption;
    // console.log(this.quantity)

    this.subtotal = this.quantity * this.discountedPrice;

    let obj: Cart = {
      id: this.cartItemId.toString(),
      placeholderImg: image,
      title: this.productName,
      variations: this.variations,
      oldPrice: this.oldPrice,
      discountedPrice: this.discountedPrice,
      quantity: this.quantity,
      totalPrice: this.subtotal,

    }


    if (this.productID = 1000) {
      if (this.size == "" || this.size == 0) {
        this.messageService.add({ key: 'normal', severity: 'error', summary: 'Error', detail: 'Size not selected' });
      } else {
        this.firebasecrudservice.setCart(this.currentUser.email, obj);
        this.toggleToast();
      }

    }



  }

  minus() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  add() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  //toast success
  // prime ng
  // showSuccess(name:any) {
  //   this.messageService.add({ severity: 'success', styleClass: 'styleClass', summary: 'Success', detail: name + ' has been added to your cart. Click to go to cart.' });
  // }

  //coreUi
  toggleToast() {
    this.visible = !this.visible;
    this.name = this.productName;
    this.messageService.add({ key: 'normal', severity: 'success', summary: 'Success', detail: this.name + ' has been added to your cart.' });
  }

  // onVisibleChange($event: boolean) {
  //   this.visible = $event;
  //   this.percentage = !this.visible ? 0 : this.percentage;
  // }

  // onTimerChange($event: number) {
  //   this.percentage = $event * 25;
  // }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  selectSize(size: number) {
    this.size = size;
    console.log(size)
    let t1 = document.getElementById('size' + 7);
    let t2 = document.getElementById('size' + 7.5);
    let t3 = document.getElementById('size' + 8);
    let t4 = document.getElementById('size' + 8.5);
    let t5 = document.getElementById('size' + 9);
    let t6 = document.getElementById('size' + 9.5);


    let el = document.getElementById('size' + size);
    if (!el?.classList.contains('selectedSize')) {

      // remove others
      t1?.classList.remove('selectedSize');
      t2?.classList.remove('selectedSize');
      t3?.classList.remove('selectedSize');
      t4?.classList.remove('selectedSize');
      t5?.classList.remove('selectedSize');
      t6?.classList.remove('selectedSize');

      el?.classList.add('selectedSize')
    } else {
      this.size = 0;
      el.classList.remove('selectedSize')
    }

  }
}
