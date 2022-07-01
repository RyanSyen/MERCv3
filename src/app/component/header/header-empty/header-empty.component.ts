
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-empty',
  templateUrl: './header-empty.component.html',
  styleUrls: ['./header-empty.component.scss']
})
export class HeaderEmptyComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
  goToFAQ() {
    this.router.navigate(['/login']);
  }
}
