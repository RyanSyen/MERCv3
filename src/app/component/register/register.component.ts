import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  showPassword : boolean = false;
  showing : boolean = false;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  showHidePassword() {
    //change the type between text and password
    this.showPassword = !this.showPassword;
    //change icon when show or hide password
    this.showing = !this.showing;
  }


  register(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    } 

    if(this.password == ''){
      alert('Please enter password');
      return;
    }


    //if email and password are filled then we can call the login auth service
    this.auth.register(this.email, this.password);

    //then we reset the values of email and password
    this.email = '';
    this.password = '';
  }

  onStrengthChange(strength: number) {
    console.log(strength)
  }


}
