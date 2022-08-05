import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userName: string = "";
  user: any;
  userAccPage = "profile";

  constructor(public authService: AuthService) {


  }

  ngOnInit(): void {


  }


  slide(page: string) {

    // $('.pages').toggleClass('move-right');
    $('.pages').addClass('move-right');


    setTimeout(() => {
      this.userAccPage = page;
      $('.pages').removeClass('move-right');
    }, 800)

  }

}
