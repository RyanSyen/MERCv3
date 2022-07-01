import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
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
