import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/domain/cart';
import { ProductService } from 'src/app/service/productservice';
import { PrimeNGConfig } from 'primeng/api';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


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

  private firestore: FirebaseTSFirestore;


  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig, private firebaseService:FirebaseCRUDService)  {
    this.firestore = new FirebaseTSFirestore();

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.productService.getCartItems().then(items => {
      this.items = items;
      console.log(items);
    });

    // directly get doc from collection
    this.firestore.getDocument(
      {
         path: [
            "Cart", 
            "User1Collection"
         ]
      }
   );
    

    // this.firebaseService.getCart().subscribe((res:Cart[])=> {
    //   this.items= res;
    // })


  }

  // ngAfterViewInit(){
  //   $(".toggle").click(() =>{
  //     console.log($(this).is(':checked'));
  //   });
  // }

  checkAll() {
    this.total = 0;

    this.checkingAll = !this.checkingAll;
    this.checkingInidividual = !this.checkingInidividual;

    // get total item count
    this.itemCount = Object.keys(this.items).length;

    // empty array first to avoid conflict with individual check boxes
    // this.totalPriceArr = [];

    if (this.checkingAll == true) {
      this.checkbox = "active";
      // this.total = this.sum;
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        var element = document.getElementById(i.toString());
        element?.classList.add('active');
        let price = this.items[i].discountedPrice;
        this.total += price;
      }

    } else {
      console.log("non-active")
      this.checkbox = "";
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        var element = document.getElementById(i.toString());
        element?.classList.remove('active');
      }
      this.total = 0;
      this.itemCount = 0;
    }

  }

  checkIndividual(index: number) {

    let element = document.getElementById(index.toString());

    console.log(this.checkingInidividual + "individual")

    // if previous status is nonactive, then execute to be active
    if (element?.classList.contains('active')) {
      // this.checkingInidividual = !this.checkingInidividual;
      let element = document.getElementById(index.toString());
      element?.classList.remove('active');
      let price = this.items[index].discountedPrice;
      let priceIndex = this.totalPriceArr.indexOf(price, 0);
      console.log(this.totalPriceArr)
      console.log(priceIndex);
      this.totalPriceArr.splice(priceIndex, 1);
      console.log(this.totalPriceArr)

      this.total = this.calculateTotal();
      this.itemCount -= 1;

    } else {
      // if click check box then return product
      // this.checkingInidividual = !this.checkingInidividual;
      let element = document.getElementById(index.toString());
      element?.classList.add('active');
      // this.total = this.items[index].discountedPrice;
      // better to put in an array
      // this.totalPriceArr.push(index, this.items[index].discountedPrice);
      this.totalPriceArr.push(this.items[index].totalPrice);
      this.total = this.calculateTotal();
      console.log(this.total);
      this.itemCount += 1;
    }

    // for (let i = 0; i < Object.keys(this.items).length; i++) {

    //   if (index == i) {
    //     this.checkingInidividual = !this.checkingInidividual;
    //     if (this.checkingInidividual == true) {
    //       let element = document.getElementById(index.toString());
    //       element?.classList.add('active');
    //       this.total = this.items[index].discountedPrice;
    //       this.itemCount = 1;
    //     } else {
    //       let element = document.getElementById(index.toString());
    //       element?.classList.remove('active');
    //       this.total = 0;
    //       this.itemCount = 0;
    //     }

    //     let element = document.getElementById(index.toString());
    //     if (element!.classList.contains('nonactive')) {
    //       this.checkbox = "";
    //     }

    //   }
    // }


  }



  showModalDialog() {
    this.displayModal = true;
  }

  calculateTotal() {
    console.log(this.totalPriceArr)
    let total = this.totalPriceArr.reduce((sum, a) => sum + a, 0);
    return total;

  }

  addQuantity(index: number, price : any) {
    let q = this.items[index].quantity;
    if (q != 99) {
      // add and update in firebase
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        if (index == i) {
          this.quantity != this.items[index].quantity;
          this.quantity++;
        }
      }

      // reflect changes to the UI
      this.items[index].quantity = this.quantity;

      // update total
      if (this.items[index].discountedPrice != 0 ) {
        this.items[index].totalPrice = price * this.quantity;
        this.total = this.calculateTotal();
        console.log(this.items[index].totalPrice)
      }
    }


  }

  minusQuantity(index: number) {
    let q = this.items[index].quantity;
    if (q != 1) {
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        if (index == i) {
          this.quantity != this.items[index].quantity;
          this.quantity--;
        }
      }
      this.items[index].quantity = this.quantity;
    }

  }

}
