import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/domain/cart';
import { ProductService } from 'src/app/service/productservice';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { browserRefresh } from '../../app-routing.module';
import { throttleTime } from 'rxjs';
import { MessageService } from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
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


  private firestore: FirebaseTSFirestore;

  public browserRefresh: boolean = false;

  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig, private firebaseService: FirebaseCRUDService, private messageService: MessageService) {

    this.firestore = new FirebaseTSFirestore();



  }

  // ngStyle 
  checkIndividualStyle = {
    "visibility": "hidden"
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    // this.testFunction(1000);



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

  }



  //* simplify by not including check box due to bugs
  // checkAll() {
  //   console.log(" checkAll is running now!");
  //   this.total = 0;

  //   this.checkingAll = !this.checkingAll;
  //   this.checkingInidividual = !this.checkingInidividual;

  //   // get total item count
  //   this.itemCount = Object.keys(this.items).length;

  //   // empty array first to avoid conflict with individual check boxes
  //   // this.totalPriceArr = [];

  //   if (this.checkingAll == true) {
  //     this.checkbox = "active";
  //     // this.total = this.sum;
  //     for (let i = 0; i < Object.keys(this.items).length; i++) {
  //       var element = document.getElementById(i.toString());
  //       element?.classList.add('active');
  //       let price = this.items[i].totalPrice;
  //       this.total += price;
  //     }

  //   } else {
  //     console.log("non-active")
  //     this.checkbox = "";
  //     for (let i = 0; i < Object.keys(this.items).length; i++) {
  //       var element = document.getElementById(i.toString());
  //       element?.classList.remove('active');

  //     }
  //     this.total = 0;
  //     this.itemCount = 0;

  //     // to update value of total. When not checked then total = 0
  //     this.onSelectChange();
  //   }

  // }

  // checkIndividual(index: number, event: Event) {


  //   let element = document.getElementById(index.toString());


  //   // if previous status is nonactive, then execute to be active
  //   if (element?.classList.contains('active')) {

  //     let element = document.getElementById(index.toString());
  //     element?.classList.remove('active');

  //     // this.checkIndividualStyle.visibility = "hidden";

  //     // let price = this.items[index].discountedPrice;
  //     // let priceIndex = this.totalPriceArr.indexOf(price, 0);
  //     // console.log(this.totalPriceArr)
  //     // console.log(priceIndex);
  //     // this.totalPriceArr.splice(priceIndex, 1);
  //     // console.log(this.totalPriceArr)

  //     // just displaying product subtotal
  //     // this.total = this.calculateTotal();
  //     this.total = this.items[index].totalPrice;
  //     this.itemCount -= 1;


  //     // to update value of total. When not checked then total = 0
  //     this.onSelectChange();
  //   } else {
  //     // if click check box then return product

  //     let element = document.getElementById(index.toString());
  //     element?.classList.add('active');
  //     // this.checkIndividualStyle.visibility = "visible";
  //     // element?.addEventListener("click", function () {
  //     //   element?.classList.add("active");
  //     // })

  //     this.totalPriceArr.push(this.items[index].totalPrice);
  //     this.total = this.items[index].totalPrice;
  //     console.log(this.total);
  //     this.itemCount += 1;
  //     console.log(this.itemCount)
  //   }
  // }





  showModalDialog() {
    this.displayModal = true;
  }

  addQuantity(id: any, index: number, price: any) {
    console.log(" addQuantity is running now!");

    let q = this.items[index].quantity;
    let subtotal: any;
    if (q < 100) {
      this.quantity = q;
      this.quantity++;

      // reflect changes to the UI
      this.items[index].quantity = this.quantity;

      // update item's subtotal
      this.items[index].totalPrice = price * this.quantity;
      subtotal = this.items[index].totalPrice;

      // update to firebase
      // this.firebaseService.updateCartPriceQuantity(id, this.quantity, subtotal);
      this.updateFunction(id, this.quantity, subtotal);

      // continue to make it active so that it wont dissapear
      // let element = document.getElementById(index.toString());
      // element?.classList.add('active');

      // check if product is selected, if yes display total, else total = 0
      // this.onSelectChange();
    }


  }

  minusQuantity(id: any, index: number, price: any) {
    let q = this.items[index].quantity;
    let subtotal: any;
    if (q != 1) {
      q--;
      this.items[index].quantity = q;
    }


    this.items[index].totalPrice = price * q;
    subtotal = this.items[index].totalPrice;


    // update to firebase
    this.firebaseService.updateCartPriceQuantity(id, q, subtotal);

    // check if product is selected, if yes display total, else total = 0
    // this.onSelectChange();
  }

  // *related to the checked functionality
  // onSelectChange() {
  //   // if all is not checked then display total = 0, if checked then display total
  //   for (let i = 0; i < Object.keys(this.items).length; i++) {
  //     var element = document.getElementById(i.toString());
  //     var checked = element?.classList.contains('active');
  //     if (!checked) {
  //       this.total = 0;
  //     }

  //   }
  // }

  updateFunction(id: any, quantity: number, subtotal: any) {

    this.firestore.update(
      {
        path: [
          "cart",
          id
        ],
        data: {
          quantity: quantity,
          totalPrice: subtotal
        },
        onComplete: docRef => {
          // Code gets executed when it was successful.
          // alert("Data updated!");
        },
        onFail: err => {
          // Code gets executed when it fails.
          alert(err.message);
        }
      }
    );
  }

  testFunction(id: any) {
    let test = this.items[0];
    this.firestore.create({
      path: [
        "Cart",
        id
      ],
      data: {
        test
      },
      onComplete: docId => {
        // Code gets executed when it was successful.
        alert("Data recorded!");
      },
      onFail: err => {
        // Code gets executed when it fails.
        alert(err.message);
      }
    });
  }

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
        this.firebaseService.populateWithFirebaseTSFirestore(this.items[i]);
      }
    });
  }

}
