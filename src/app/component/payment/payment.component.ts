import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../service/checkout.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  paymentHandler: any = null;

  success: boolean = false

  failure: boolean = false

  constructor(private checkout: CheckoutService) { }

  ngOnInit(): void {
    this.invokeStripe();
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KiEXBFN13hoDLby9WPZJAKOf7i92hVpeKw9EnnyStV7ZEgQqytzf8k6r7rAb0rIYuDkHyWFgO1zrN3nhQLVhi9i00rhHxNUR4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken })
        // alert('Stripe token generated!');
        paymentstripe(stripeToken);
      }
    });

    const paymentstripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
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

}
