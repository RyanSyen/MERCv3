import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  requiredErr: boolean = false;
  invalid: boolean = true;
  showPassword: boolean = false;
  showing: boolean = false;
  inputElement:any;

  // @ViewChild('emailInput') emailInput!: ElementRef;

  // divEl: HTMLDivElement = this.emailInput.nativeElement.value;

  // console.log(this.divEl);

  //inject auth service
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  showHidePassword() {
    //change the type between text and password
    this.showPassword = !this.showPassword;
    //change icon when show or hide password
    this.showing = !this.showing;
  }

  login() {

    //both email and password are null
    if (this.email == '' && this.password == '')

      if (this.email == '') {
        alert('Please enter email');
        this.requiredErr = true;
        return;
      }

    if (!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.requiredErr = false;
      this.invalid = false;
    }

    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    //if email and password are filled then we can call the login auth service
    this.auth.login(this.email, this.password);

    //then we reset the values of email and password
    this.email = '';
    this.password = '';
  }

  navigateToForgotPasswordPage() {
    this.router.navigate(['/forgot-password']);
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  

}
