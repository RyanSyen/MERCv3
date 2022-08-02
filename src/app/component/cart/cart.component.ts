
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/domain/cart';
import { ProductService } from 'src/app/service/productservice';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { browserRefresh } from '../../app-routing.module';
import { throttleTime } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Voucher } from './../../domain/voucher';
// import { FormBuilder } from '@angular/forms';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, AfterViewInit {
  cartItems: Cart[] = [];
  items: Cart[] = [];
  totalPriceArr: Array<any> = [];
  itemCount: number = 0;
  displayModal!: boolean;
  checkingAll: boolean = false;
  checkingInidividual: boolean = false;
  discountsApplied: number = 0.00;
  checkbox: string = '';
  checkboxIndividual: string = '';
  total: any = 0;
  check: string = 'nonactive';
  sum = 0;
  quantity: number = 1;
  count: number = 0;
  newCheck = false;

  // voucher
  vouchers: Voucher[] = [];
  checked = false;
  voucher0Title: string = "";
  voucher1Title: string = "";
  voucher2Title: string = "";
  voucher0Min: number = 0;
  voucher1Min: number = 0;
  voucher2Min: number = 0;
  feedback: string = "";
  feedback1: string = "";
  feedback2: string = "";

  // toast
  visible = false;
  position = 'top-end';
  percentage = 0;

  loaded = false;

  displayVouchersModal = true;

  private firestore: FirebaseTSFirestore;

  public browserRefresh: boolean = false;

  // toppings = this._formBuilder.group({
  //   1: false,
  //   2: false,
  //   3: false,
  // });
  @HostListener('window:load')
  onLoad() {
    this.loaded = true;
    console.log('is window:load');

  }

  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig, private firebaseService: FirebaseCRUDService, private messageService: MessageService, private router: Router) {

    this.firestore = new FirebaseTSFirestore();



  }

  // ngStyle 
  checkIndividualStyle = {
    "visibility": "hidden"
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;


    // check if browser refreshed
    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    //* fetch from JSON
    // this.productService.getCartItems().then(items => {
    //   this.cartItems = items;
    // });


    //* fetch from firebase (method 1)
    this.firebaseService.getCart().subscribe((product: Cart[]) => {
      this.items = product;
      // calculate the total in cart
      this.total = 0;
      this.itemCount = 0;
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        this.total = this.total + this.items[i].totalPrice;
        this.itemCount++;
      }

      console.log("get cart service triggered")


    })

    //* fetch voucher from firebase
    // error and completion signal is not working, maybe observable is not emitted
    this.firebaseService.getVouchers().subscribe((voucher: Voucher[]) => {
      this.vouchers = voucher;
      this.voucher0Title = voucher[0].title;
      this.voucher1Title = voucher[1].title;
      this.voucher2Title = voucher[2].title;
      this.voucher0Min = voucher[0].min;
      this.voucher1Min = voucher[1].min;
      this.voucher2Min = voucher[2].min;
      console.log(voucher)
    })

  }

  ngAfterViewInit(): void {
    // let elementt = document.getElementById("cashback");
    // alert(elementt)
  }



  addQuantity(id: any, index: number, price: any) {
    console.log(" addQuantity is running now!");

    let q = this.items[index].quantity;
    let subtotal: any;
    if (q < 100) {
      q++;
      this.quantity = q;
      // this.quantity = q;
      // this.quantity++;

      // reflect changes to the UI
      this.items[index].quantity = this.quantity;

      // update item's subtotal
      this.items[index].totalPrice = price * q;
      subtotal = this.items[index].totalPrice;

      // update to firebase
      this.firebaseService.updateCartPriceQuantity(id, q, subtotal).then(() => {
        console.log("Data updated successfully!");
        this.function();
      })
      // this.updateFunction(id, this.quantity, subtotal);
    }


  }

  minusQuantity(id: any, index: number, price: any) {
    let q = this.items[index].quantity;
    let subtotal: any;
    if (q != 1) {
      q--;
      this.items[index].quantity = q;

      this.items[index].totalPrice = price * q;
      subtotal = this.items[index].totalPrice;


      // update to firebase
      this.firebaseService.updateCartPriceQuantity(id, q, subtotal).then(() => {
        console.log("Data updated successfully!");
        this.function();
      })
    }




    // console.log(this.firebaseService.updateCartPriceQuantity(id, q, subtotal));
    // check if product is selected, if yes display total, else total = 0
    // this.onSelectChange();
  }


  // backup method to do CRUD -> refer to onenote
  // updateFunction(id: any, quantity: number, subtotal: any) {

  //   this.firestore.update(
  //     {
  //       path: [
  //         "cart",
  //         id
  //       ],
  //       data: {
  //         quantity: quantity,
  //         totalPrice: subtotal
  //       },
  //       onComplete: docRef => {
  //         // Code gets executed when it was successful.
  //         // alert("Data updated!");
  //       },
  //       onFail: err => {
  //         // Code gets executed when it fails.
  //         alert(err.message);
  //       }
  //     }
  //   );
  // }

  removeItem(id: string) {
    this.firebaseService.deleteCartItem(id);
  }

  clearCart() {
    this.showConfirm();

    for (let i = 0; i < Object.keys(this.items).length; i++) {
      this.firebaseService.deleteCartItem(this.items[i].id);
    }

  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to clear cart' });
  }

  populateCart() {
    this.productService.getCartItems().then(items => {
      this.items = items;
      this.count = items.length;

      for (let i = 0; i < this.count; i++) {
        this.firebaseService.setCart(this.items[i]);
        // this.firebaseService.populateWithFirebaseTSFirestore(this.items[i]);
      }
    });
  }

  showModalDialog() {
    console.log(this.total)
    if (this.loaded == true) {
      // this.function();
      // alert("executed function")
      setTimeout(() => {
        this.function();
      }, 100)
      // this.function();
      this.displayModal = true;
    }

  }

  selectVoucher(id: string) {

    let element = document.getElementById(id);
    let unchecked = element?.classList.contains("voucherNotSelected");
    if (unchecked == true) {
      element?.classList.remove("voucherNotSelected");
      element?.classList.add("voucherSelected");

      if (id == "cashback") {
        this.feedback = "Cashback voucher selected."
      }
    } else {
      element?.classList.remove("voucherSelected");
      element?.classList.add("voucherNotSelected");
    }
  }

  selectingVoucher() {
    console.log(this.discountsApplied)
    let element = document.getElementById("cashback");
    let element1 = document.getElementById("discount");
    let element2 = document.getElementById("freeShipping");
    let unchecked = element?.classList.contains("voucherSelected");
    let unchecked1 = element1?.classList.contains("voucherSelected");
    let unchecked2 = element2?.classList.contains("voucherSelected");

    if (unchecked == true) {
      this.feedback = "Cashback voucher applied successfully."
      this.discountsApplied += this.total * (this.vouchers[0].cashback / 100);
    } else {
      this.feedback = "";
    }
    if (unchecked1 == true) {
      this.feedback1 = "Discount voucher applied successfully."
      console.log(this.vouchers[1].discount)
      this.discountsApplied += this.vouchers[1].discount;
    } else {
      this.feedback1 = "";
    }
    if (unchecked2 == true) {
      this.feedback2 = "Free Shipping voucher applied successfully."
      this.discountsApplied += 5;
    } else {
      this.feedback2 = "";
    }

    this.displayModal = false;
    this.toggleToast();
    this.displayVouchersModal = false;
  }

  toggleToast() {
    console.log("toggle toast" + this.visible)
    // this.visible = !this.visible;
    this.visible = true;
  }

  function() {
    var firstVoucher = document.getElementById('firstVoucher');
    var secondVoucher = document.getElementById('secondVoucher');
    var thirdVoucher = document.getElementById('thirdVoucher');

    console.log(this.total)
    if (this.total < 100) {
      firstVoucher?.classList.add('disabled');
    } else if (this.total < 500) {
      secondVoucher?.classList.add('disabled');
      thirdVoucher?.classList.add('disabled');
      console.log("blocked successfully");
    } else {
      firstVoucher?.classList.remove('disabled');
      secondVoucher?.classList.remove('disabled');
      thirdVoucher?.classList.remove('disabled');
      console.log("removed block successfully");
    }
  }

  goToCheckout() {
    this.router.navigate(['/payment']);
  }

}
