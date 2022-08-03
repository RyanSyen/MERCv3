import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../service/checkout.service'
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { selectedVoucher } from 'src/app/domain/selectedVoucher';
import { Cart } from 'src/app/domain/cart';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { first, of } from 'rxjs';
import Stripe from 'stripe';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

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

  constructor(private checkout: CheckoutService, private firebasecrudservice: FirebaseCRUDService, private router: Router) { }

  ngOnInit(): void {
    this.invokeStripe();

    this.firebasecrudservice.getCart().subscribe((product: Cart[]) => {
      this.items = product;
      // calculate the total in cart
      this.total = 5;
      this.itemCount = 0;
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        this.total = this.total + this.items[i].totalPrice;
        this.itemCount++;
      }


    })

    //get selectedVoucher from firebase
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
      this.router.navigate(['/home']);
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
      secondCircle?.classList.add("done");
      thirdCircle?.classList.add("active");
      thirdCircleCaption?.classList.add("active");
      this.step++;
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
        this.toastError = !this.toastError;
        setTimeout(() => {
          this.toastError = !this.toastError;
        }, 5000);
      }


    } else if (this.step == 4) {
      // fourthCircle?.classList.remove("active");
      fourthCircle?.classList.add("done");
      cancelBtn!.style.visibility = 'hidden';
      document.querySelector('#next')!.innerHTML = 'Home';
      this.initializePayment(this.total);
      this.step++;
    } else if (this.step == 5) {
      this.router.navigate(['/home']);
    }
  }

  credit() {
    this.visibleCredit = !this.visibleCredit;
    this.visibleCD = true;
  }

  creditDebit() {
    this.visibleCD = !this.visibleCD;
    this.visibleCredit = true;
  }


}
