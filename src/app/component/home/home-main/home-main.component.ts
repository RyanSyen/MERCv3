import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ActivatedRoute } from '@angular/router';
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { User } from 'src/app/shared/user';
import { Unary } from '@angular/compiler';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})
export class HomeMainComponent implements OnInit {

  userid: any;
  user: any;

  constructor(private _Activatedroute: ActivatedRoute, private firebaseService: FirebaseCRUDService) { }

  ngOnInit(): void {
    AOS.init();



    this._Activatedroute.paramMap.subscribe(params => {
      this.userid = params.get('userid');
      console.log("user id = " + this.userid)
    });

    this.user = this.firebaseService.getUserData();
    console.log("email: " + this.firebaseService.getUserData())
  }

  body = document.body;
  html = document.documentElement;



  height = Math.max(this.body.scrollHeight, this.body.offsetHeight,
    this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);

  test = this.height - 74;

  style = {
    'height': '800',
    'margin': '0',
    'background-color': '#5ca0f2',
    'background-image': 'linear-gradient(315deg, #5ca0f2 0%, #f5f7f6 74%)'
  }


}
