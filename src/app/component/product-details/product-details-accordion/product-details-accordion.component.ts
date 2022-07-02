import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details-accordion',
  templateUrl: './product-details-accordion.component.html',
  styleUrls: ['./product-details-accordion.component.scss']
})
export class ProductDetailsAccordionComponent implements OnInit {

  productId : any;

  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = params.get('id');
    })
  }

}
