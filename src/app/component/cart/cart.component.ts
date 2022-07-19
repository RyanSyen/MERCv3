import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/domain/cart';
import { ProductService } from 'src/app/service/productservice';
import { PrimeNGConfig } from 'primeng/api';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: Cart[] = [];
  totalPriceArr: Array<any> = [];
  itemCount: number = 0;
  displayModal!: boolean;
  checkingAll: boolean = false;
  checkingInidividual: boolean = false;
  discountsApplied: number = 0.00;
  checkbox : string = '';
  checkboxIndividual : string = '';

  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig) {


  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.productService.getCartItems().then(items => {
      this.items = items;
      console.log(items);
    });



  }

  // ngAfterViewInit(){
  //   $(".toggle").click(() =>{
  //     console.log($(this).is(':checked'));
  //   });
  // }

  checkAll() {
    
    for (let i = 0; i < Object.keys(this.items).length; i++) {
      // console.log(i)
      // $("#i").removeAttr( "checked" );
      console.log(i)
      console.log($("#i").is(':checked')) ;
    }

    this.checkingAll = !this.checkingAll;

    // get total item count
    this.itemCount = Object.keys(this.items).length;

    // empty array first to avoid conflict with individual check boxes
    this.totalPriceArr = [];

    if (this.checkingAll == true) {
      this.checkbox = "active";
      // checked all
      $(".toggle").attr("checked", true);
    } else {
      this.checkbox = "";
      this.checkIndividual(99999);
      console.log("uncheck all")
      // unchecked all
      this.totalPriceArr = [];
      $(".toggle").attr("checked", false);


    }

    // for (let i = 0; i < Object.keys(this.items).length; i++) {

    let ticked = $(".toggle").is(':checked');

    if (ticked == true) {
      for (let i = 0; i < Object.keys(this.items).length; i++) {
        // store item price to array for calculation
        let price = this.items[i].discountedPrice;
        this.totalPriceArr.push(price);
        this.calculateTotal();
      }
    } else {
      console.log("not checked")
      this.itemCount = 0;
      this.totalPriceArr = [];
      this.calculateTotal();
    }
    // }

  }

  checkIndividual(index: number) {

    this.checkingInidividual = !this.checkingInidividual;
    console.log(this.checkingInidividual)

    for (let i = 0; i < Object.keys(this.items).length; i++) {

      if (index == i) {
        if (this.checkingInidividual == true) {
          $("#index").attr("checked", true);
          // $('.tick[id="index"]').addClass("active");
          let id = document.getElementById('0');
          console.log(id)
          $("#id").attr("class", "active");
        } else {
          
          $("#index").attr("checked", false);
          $("#index").removeClass("active");
        }

        let ticked = $(".toggle").is(':checked');

        if (ticked == true) {
          $("#index").addCLass("active");
          this.itemCount += 1;
          // store item price to array for calculation
          let price = this.items[index].discountedPrice;
          this.totalPriceArr.push(this.items[i].discountedPrice);
          this.calculateTotal();
        } else {
          $("#index").removeClass("active");
          this.itemCount = 0;
          this.totalPriceArr.pop();
          this.calculateTotal();
        }
      }
    }

  }

  showModalDialog() {
    this.displayModal = true;
  }

  calculateTotal() {
    let total = this.totalPriceArr.reduce((sum, a) => sum + a, 0);
    return total;
  }

}
