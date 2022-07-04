import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-normal',
  templateUrl: './header-normal.component.html',
  styleUrls: ['./header-normal.component.scss']
})
export class HeaderNormalComponent {

  checkLoggedIn : boolean = false;
  constructor(public auth: AuthService, private router: Router) {
    if(this.auth.isLoggedIn){
      this.checkLoggedIn = true;
    }else{
      this.checkLoggedIn = false;
    }
   }

   goToFAQ(){
    // example with param 
    // this.router.navigate(['/something/create'], { queryParams: { user: this.user.id } });
    // { path: 'something/create',  component: SomeComponent }

    this.router.navigate(['/register']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }
}
