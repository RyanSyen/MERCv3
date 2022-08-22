import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../service/checkout.service'
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { selectedVoucher } from 'src/app/domain/selectedVoucher';
import { Cart } from 'src/app/domain/cart';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { first, of } from 'rxjs';
import Stripe from 'stripe';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { userDetails } from 'src/app/domain/userDetails';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user';
import { address } from 'src/app/domain/address';
import { Order } from 'src/app/domain/order';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  userID: any;
  currentOrderID: number = 0o000;

  userName = "test";
  userAccPage = "profile";
  userImg = "";
  userEmail = "";
  userAddress = "";
  userUser: any;
  currentUser: any;
  currentUserDetails: any;
  phoneNumber: any;
  allAddress: address[] = [];
  selectedAddress: any;


  userBal = 0;

  invalidHP = true;

  phoneNumberRegex: RegExp = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/g;

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false


  // products from cart
  items: any;
  total = 0;
  itemCount = 0;

  // retrieve voucher from firebase
  voucher1: string = "";
  voucher2: string = "";
  voucher3: string = "";
  selectedVoucher: any;

  step: number = 1;
  visibleCredit = true;
  visibleCD = true;

  stripe: Stripe | undefined;
  purchase: any;

  paymentMethod = "";
  toastError = false;
  position = 'top-end';

  loaderVisibility = false;
  successMsg = true;
  failMsg = true;

  userHP: any;
  orderOrder: any;

  constructor(public authService: AuthService, private checkout: CheckoutService, private firebasecrudservice: FirebaseCRUDService, private router: Router, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.currentUser = this.authService.getCurrentUserData();
    console.log(this.currentUser.email);
    // console.log(this.currentUser.userPassword);
  }

  ngOnInit(): void {
    this.invokeStripe();

    //* get user order
    this.firebasecrudservice.getUserOrder(this.currentUser.email).subscribe((order) => {
      // this.orderOrder = order;
      order.forEach(element => {

        this.currentOrderID = element['orderID'];
        console.log(this.currentOrderID)
      });
    })

    //* get cart
    this.firebasecrudservice.getCart(this.currentUser.email).subscribe((product: Cart[]) => {
      this.orderOrder = product;
      //// calculate the total in cart
      // this.total = 0;
      // this.itemCount = 0;
      // for (let i = 0; i < Object.keys(this.items).length; i++) {
      //   this.total = this.total + this.items[i].totalPrice;
      //   this.itemCount++;
      // }


    })

    //* get uID
    let testing = JSON.parse(window.localStorage.getItem('user')!);
    this.userID = testing.uid;


    //* get phone number
    // this.phoneNumber = JSON.parse(window.localStorage.getItem('userHP'));
    console.log(window.localStorage.getItem('userHP'));
    let phoneNumberExist = window.localStorage.getItem('userHP');

    if (phoneNumberExist) {
      this.phoneNumber = "0" + phoneNumberExist;
    } else {
      this.phoneNumber = "";
    }

    //* fetch user data from firebase
    this.firebasecrudservice.getUserData().subscribe((userDetails: User[]) => {
      this.userUser = userDetails;
      // this.userAddress = this.userUser.address;
      console.log(userDetails)
      this.userUser.forEach((element: any) => {
        if (element.id == this.currentUser.email) {
          this.userName = element.displayName;
        }
      });
    })

    //* fetch user details from firebase (for address)
    this.firebasecrudservice.getUserDetails(this.currentUser.email).subscribe((userDetails: userDetails[]) => {
      userDetails.forEach((element: any) => {
        if (element.id == this.currentUser.email) {
          this.userAddress = element.address;
        }
      });
    })

    //* get items in cart from db
    this.firebasecrudservice.getCart(this.currentUser.email).subscribe((product: Cart[]) => {
      this.items = product;
      // calculate the total in cart
      this.total = 5;
      this.itemCount = 0;
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        this.total = this.total + this.items[i].totalPrice;
        this.itemCount++;
      }

    })

    //* get user balance
    this.firebasecrudservice.getBalance().subscribe((balance) => {
      console.log(balance);
      balance.forEach(element => {
        console.log(element['balance'], this.total)
        if (element['email'] == this.currentUser.email) {
          console.log("true email")
          this.userBal = element['balance'];
        }
      })
    });

    //* get selectedVoucher from firebase
    this.firebasecrudservice.getSelectedVouchers().subscribe((selectedVoucher: selectedVoucher[]) => {
      this.selectedVoucher = selectedVoucher;
    });


  }

  // stripe payment function

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KiEXBFN13hoDLby9WPZJAKOf7i92hVpeKw9EnnyStV7ZEgQqytzf8k6r7rAb0rIYuDkHyWFgO1zrN3nhQLVhi9i00rhHxNUR4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken })
        // alert('Stripe token generated!');
        paymentstripe(stripeToken, amount);
      }
    });

    const paymentstripe = (stripeToken: any, amount: number) => {
      this.checkout.makePayment(stripeToken, amount).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
          this.loaderVisibility = true;
          this.successMsg = false;
        }
        else {
          this.failure = true;
          this.loaderVisibility = true;
          this.failMsg = false;
        }
      });
    };

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KiEXBFN13hoDLby9WPZJAKOf7i92hVpeKw9EnnyStV7ZEgQqytzf8k6r7rAb0rIYuDkHyWFgO1zrN3nhQLVhi9i00rhHxNUR4',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

  cancelCheckout() {

    let firstCircle = document.getElementById("productsOrdered");
    let secondCircle = document.getElementById("receiversInfo");
    let thirdCircle = document.getElementById("paymentMtd");
    let fourthCircle = document.getElementById("confirmation");
    let firstCircleCaption = document.getElementById("productsOrderedCaption");
    let secondCircleCaption = document.getElementById("receiversInfoCaption");
    let thirdCircleCaption = document.getElementById("paymentMtdCaption");
    let fourthCircleCaption = document.getElementById("confirmationCaption");
    let cancelBtn = document.getElementById("cancel");
    let nextBtn = document.getElementById("next");

    if (this.step == 1) {
      // cancel checkout go back home page
      this.router.navigate(['/home/' + this.userID]);
    } else if (this.step == 2) {
      secondCircle?.classList.remove("active");
      secondCircleCaption?.classList.remove("active");
      firstCircle?.classList.remove("done");
      firstCircle?.classList.add("active");
      this.step--;
    } else if (this.step == 3) {
      thirdCircle?.classList.remove("active");
      thirdCircleCaption?.classList.remove("active");
      secondCircle?.classList.remove("done");
      secondCircle?.classList.add("active");
      this.step--;
    } else if (this.step == 4) {
      fourthCircle?.classList.remove("active");
      fourthCircleCaption?.classList.remove("active");
      thirdCircle?.classList.remove("done");
      thirdCircle?.classList.add("active");
      this.step--;
    }

  }

  nextStep() {

    let firstCircle = document.getElementById("productsOrdered");
    let secondCircle = document.getElementById("receiversInfo");
    let thirdCircle = document.getElementById("paymentMtd");
    let fourthCircle = document.getElementById("confirmation");
    let firstCircleCaption = document.getElementById("productsOrderedCaption");
    let secondCircleCaption = document.getElementById("receiversInfoCaption");
    let thirdCircleCaption = document.getElementById("paymentMtdCaption");
    let fourthCircleCaption = document.getElementById("confirmationCaption");
    let cancelBtn = document.getElementById("cancel");
    let nextBtn = document.getElementById("next");
    // move from step 1 to step 2, change circle1 to done and focus on circle2


    if (this.step == 1) {

      // firstCircle?.classList.remove("active");
      // firstCircleCaption?.classList.remove("active");
      firstCircle?.classList.add("done");
      secondCircle?.classList.add("active");
      secondCircleCaption?.classList.add("active");
      document.querySelector('#cancel')!.innerHTML = 'Back';
      this.step++;
    } else if (this.step == 2) {
      // secondCircle?.classList.remove("active");
      // secondCircleCaption?.classList.remove("active");


      let verifyNum = this.phoneNumberRegex.test(this.phoneNumber);
      if (verifyNum == false) {
        this.invalidHP = false;
      } else {
        // hide err msg
        this.invalidHP = true;
        this.phoneNumber = parseInt(this.phoneNumber);
        // store phone number to local storage
        window.localStorage.setItem('userHP', JSON.stringify(this.phoneNumber))

        if (this.userName == "" || this.phoneNumber == "" || this.userAddress == "") {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'One or more input fields are empty!' });
        } else {

          secondCircle?.classList.add("done");
          thirdCircle?.classList.add("active");
          thirdCircleCaption?.classList.add("active");

          this.step++;
        }
      }


    } else if (this.step == 3) {
      // thirdCircle?.classList.remove("active");
      // thirdCircleCaption?.classList.remove("active");

      // check if payment method is selected
      if (this.visibleCredit == false || this.visibleCD == false) {
        thirdCircle?.classList.add("done");
        fourthCircle?.classList.add("active");
        fourthCircleCaption?.classList.add("active");

        if (this.visibleCredit == false) {
          this.paymentMethod = "MERC Credits";
        } else if (this.visibleCD == false) {
          this.paymentMethod = "Credit/Debit card"
        }
        this.step++;
      } else {
        // this.toastError = !this.toastError;
        // setTimeout(() => {
        //   this.toastError = !this.toastError;
        // }, 5000);
        this.showError();
      }


    } else if (this.step == 4) {
      // fourthCircle?.classList.remove("active");



      // save payment method to db
      this.firebasecrudservice.setUserPaymentMethod(this.currentUser.email, this.paymentMethod)

      let today = new Date();
      let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      console.log(date + "and" + time)

      // save the order
      this.currentOrderID++;
      let order: Order =
      {
        email: this.currentUser.email,
        orderID: this.currentOrderID,
        item: this.items,
        receiverName: this.userName,
        receiverHP: this.phoneNumber,
        receiverAddress: this.userAddress,
        paymentMethod: this.paymentMethod,
        total: this.total,
        receiveDate: date,
        receiveTime: time
      }

      this.firebasecrudservice.setUserOrder(this.currentUser.email, order, this.currentOrderID)


      // this.firebasecrudservice.setUserOrder(this.currentUser.email, order);
      this.orderOrder.forEach((element: { id: string; }) => {
        console.log(element.id)
        this.firebasecrudservice.deleteCartItem(this.currentUser.email, element.id);
      });



      fourthCircle?.classList.add("done");
      cancelBtn!.style.visibility = 'hidden';
      document.querySelector('#next')!.innerHTML = 'Home';

      // credit deduction
      if (this.visibleCD == true) {
        this.userBal = this.userBal - this.total;
        console.log(this.userBal)
      } else if (this.visibleCredit == true) {
        this.initializePayment(this.total);
      }



      this.step++;
    } else if (this.step == 5) {
      this.router.navigate(['/home/' + this.userID]);
    }
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Payment method not selected. Please select one of the payment methods to proceed' });
  }

  credit() {

    if (this.userBal < this.total) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insufficent Credit! Please top up.' });
    } else {
      this.visibleCredit = !this.visibleCredit;
      this.visibleCD = true;
    }



  }

  creditDebit() {
    this.visibleCD = !this.visibleCD;
    this.visibleCredit = true;
  }

  changeAddress() {
    this.firebasecrudservice.getUserAddress(this.currentUser.email).subscribe((address: address[]) => {
      // console.log(address)
      this.allAddress = address;
      console.log(this.allAddress)
    })
  }

  onRowSelect(event: any) {
    this.messageService.add({ key: 'normal', severity: 'info', summary: 'Address Selected', detail: "address" + event.data.id + " is selected" });

    this.allAddress.forEach(element => {
      console.log(element)
      let test: any;
      test = element;
      if (event.data.id == test.id) {
        this.userAddress = test.address;
      }
    });
  }

  test(event: any) {

  }

  keyup(value: string) {
    // let verifyNum = this.phoneNumberRegex.test(value.replace(/\s+/g, ''));
    // console.log(value.replace(/\s+/g, ''), verifyNum)
    // if (verifyNum == false) {
    //   this.invalidHP = false;
    // } else {
    //   this.invalidHP = true;
    // }
  }

  saveInfo() {
    let verifyNum = this.phoneNumberRegex.test(this.phoneNumber);
    if (verifyNum == false) {
      this.invalidHP = false;
    } else {
      // hide err msg
      this.invalidHP = true;
    }

    if (this.userName == "" || this.phoneNumber == "" || this.userAddress == "") {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'One or more input fields are empty!' });
    }
  }

}
