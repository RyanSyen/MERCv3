import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { Cart } from 'src/app/domain/cart';
import { ProductService } from 'src/app/service/productservice';
import { MessageService } from 'primeng/api';
// // import { DialogService } from 'primeng/dynamicdialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

declare var $: any;

@Component({
  selector: 'app-header-normal',
  templateUrl: './header-normal.component.html',
  styleUrls: ['./header-normal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
  `]
})
export class HeaderNormalComponent implements OnInit {

  items!: Cart[];
  checkLoggedIn: boolean = false;
  selectedProduct?: Cart;
  products !: Product[];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.items;

  styling = {
    'width': '470px',
    'top': '10px !important'
  }



  constructor(public auth: AuthService, private http: HttpClient, private router: Router, private productService: ProductService, private messageService: MessageService, private modalService: NgbModal) {
    if (this.auth.isLoggedIn) {
      this.checkLoggedIn = true;
    } else {
      this.checkLoggedIn = false;
    }

  }


  ngOnInit(): void {
    this.productService.getCartItems().then(items => {
      this.items = items;
      // console.log(this.items);
      this.dataSource = items;
    });
  }

  goToFAQ() {
    // example with param 
    // this.router.navigate(['/something/create'], { queryParams: { user: this.user.id } });
    // { path: 'something/create',  component: SomeComponent }

    this.router.navigate(['/register']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onRowSelect(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
  }

  openModal(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }
}

