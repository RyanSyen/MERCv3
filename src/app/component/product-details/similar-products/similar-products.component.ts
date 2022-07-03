import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.scss']
})
export class SimilarProductsComponent implements OnInit {

  currentRate = 4.5;

  constructor() { }

  ngOnInit(): void {
  }

}
