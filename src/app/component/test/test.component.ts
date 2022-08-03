// import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef  } from '@angular/core';

// @Component({
//   selector: 'app-test',
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.scss']
// })
// export class TestComponent implements OnInit {

//   slides = [
//     { img: 'https://via.placeholder.com/600.png/09f/fff' },
//     { img: 'https://via.placeholder.com/600.png/021/fff' },
//     { img: 'https://via.placeholder.com/600.png/321/fff' },
//     { img: 'https://via.placeholder.com/600.png/422/fff' },
//     { img: 'https://via.placeholder.com/600.png/654/fff' },
//   ];
//   slideConfig = { slidesToShow: 4, slidesToScroll: 4 };
//   addSlide() {
//     this.slides.push({ img: 'http://placehold.it/350x150/777777' });
//   }
//   removeSlide() {
//     this.slides.length = this.slides.length - 1;
//   }
//   slickInit(e: any) {
//     console.log('slick initialized');
//   }
//   breakpoint(e: any) {
//     console.log('breakpoint');
//   }
//   afterChange(e: any) {
//     console.log('afterChange');
//   }
//   beforeChange(e: any) {
//     console.log('beforeChange');
//   }
//   constructor() {}
//   ngOnInit(): void {}

//   // statement = false;

//   // constructor(private changeDetector: ChangeDetectorRef) {}
//   // ngOnInit(): void {
//   // }

//   // setVideo() {
//   //   jarallax(document.querySelectorAll('.jarallax-my-video'), {
//   //     speed: 0.2,
//   //     videoSrc: 'https://vimeo.com/groups/freehd/videos/153749650'
//   //   });
//   // }

//   // changeStatement() {
//   //   this.statement = true;
//   //   this.changeDetector.detectChanges();
//   //   this.setVideo();
//   // }
//   // private initPointX: number;
//   // private initPointY: number;

// //   constructor(private ele: ElementRef) { }





// //   // ------------- VARIABLES ------------- //
// //  ticking = false;
// //  isFirefox = (/Firefox/i.test(navigator.userAgent));
// //  isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
// //  scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
// //  slideDurationSetting = 600; //Amount of time for which slide is "locked"
// //  currentSlideNumber = 0;
// //  totalSlideNumber = $(".background").length;
// //  delta: any;

// // // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
// //  parallaxScroll(evt : any) {
// //   if (this.isFirefox) {
// //     //Set delta for Firefox
// //     this.delta = evt.detail * (-120);
// //   } else if (this.isIe) {
// //     //Set delta for IE
// //     this.delta = -evt.deltaY;
// //   } else {
// //     //Set delta for all other browsers
// //     this.delta = evt.wheelDelta;
// //   }

// //   if (this.ticking != true) {
// //     if (this.delta <= -this.scrollSensitivitySetting) {
// //       //Down scroll
// //       this.ticking = true;
// //       if (this.currentSlideNumber !== this.totalSlideNumber - 1) {
// //         this.currentSlideNumber++;
// //         this.nextItem();
// //       }
// //       this.slideDurationTimeout(this.slideDurationSetting);
// //     }
// //     if (this.delta >= this.scrollSensitivitySetting) {
// //       //Up scroll
// //       this.ticking = true;
// //       if (this.currentSlideNumber !== 0) {
// //         this.currentSlideNumber--;
// //       }
// //       this.previousItem();
// //       this.slideDurationTimeout(this.slideDurationSetting);
// //     }
// //   }
// // }

// // // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
// //  slideDurationTimeout(slideDuration : any) {
// //   setTimeout(() => {
// //     this.ticking = false;
// //   }, slideDuration);
// // }

// // // ------------- ADD EVENT LISTENER ------------- //
// //  mousewheelEvent = this.isFirefox ? "DOMMouseScroll" : "wheel";
// //  @HostListener('document:click', ['$event']) documentClickEvent($event: MouseEvent) {
// //   throttle(parallaxScroll,60),false;
// //   console.log('Through HostListener - Click Event Details: ', $event)
// // }
// // // window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// // // @HostListener('mousewheel', ['$event']) scroll($event: MouseEvent) {
// // //         console.log("Entered mouse wheel");
// // //         let wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
// // //         if(wheelDelta > 0) {
// // //           factor = 0.5;
// // //         }else {
// // //          factor = 2.0;
// // //         }

// // //         this.initPointX = event.PageX;
// // //         this.initPointY = event.PageY;   
// // //     } 

// // // ------------- SLIDE MOTION ------------- //
// //   nextItem() {
// //   var $previousSlide = $(".background").eq(this.currentSlideNumber - 1);
// //   $previousSlide.removeClass("up-scroll").addClass("down-scroll");
// // }

// //   previousItem() {
// //   var $currentSlide = $(".background").eq(this.currentSlideNumber);
// //   $currentSlide.removeClass("down-scroll").addClass("up-scroll");
// // }

// }

// import { Component } from '@angular/core';
// import { FormBuilder } from '@angular/forms';


// @Component({
//   selector: 'app-root',
//   templateUrl: './test.component.html',
//   styleUrls: ['./test.component.scss']
// })
// export class TestComponent {
//   toppings = this._formBuilder.group({
//     pepperoni: false,
//     extracheese: false,
//     mushroom: false,
//   });
//   test = this._formBuilder.group("test");

//   checked = false;
//   indeterminate = false;


//   constructor(private _formBuilder: FormBuilder) { }
// }

import { Component, OnInit, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from './ticketservice';
import { Subscription } from 'rxjs';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
    selector: 'app-root',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

    items: MenuItem[] = [];

    subscription: Subscription | undefined;

    // constructor(public messageService: MessageService, public ticketService: TicketService) { }

    // ngOnInit() {
    //     this.items = [{
    //         label: 'Personal',
    //         routerLink: 'personal'
    //     },
    //     {
    //         label: 'Seat',
    //         routerLink: 'seat'
    //     },
    //     {
    //         label: 'Payment',
    //         routerLink: 'payment'
    //     },
    //     {
    //         label: 'Confirmation',
    //         routerLink: 'confirmation'
    //     }
    //     ];

    //     this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
    //         this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
    //     });
    // }

    // ngOnDestroy() {
    //     if (this.subscription) {
    //         this.subscription.unsubscribe();
    //     }
    // }


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
