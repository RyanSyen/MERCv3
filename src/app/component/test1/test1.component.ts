import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false

  constructor(private checkout: CheckoutService) { }

  ngOnInit() {
    this.invokeStripe();
  }

  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KiEXBFN13hoDLby9WPZJAKOf7i92hVpeKw9EnnyStV7ZEgQqytzf8k6r7rAb0rIYuDkHyWFgO1zrN3nhQLVhi9i00rhHxNUR4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken, amount);
      },
    });

    const paymentstripe = (stripeToken: any, amount: number) => {
      this.checkout.makePayment(stripeToken, amount).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'Coding Shiksha',
      description: 'This is a sample pdf file',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KiEXBFN13hoDLby9WPZJAKOf7i92hVpeKw9EnnyStV7ZEgQqytzf8k6r7rAb0rIYuDkHyWFgO1zrN3nhQLVhi9i00rhHxNUR4',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

}
