// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-verify-email',
//   templateUrl: './verify-email.component.html',
//   styleUrls: ['./verify-email.component.scss']
// })
// export class VerifyEmailComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit() {
  }

  goToSignIn() {
    this.route.navigate(['/login']);
  }
}