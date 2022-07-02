import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

declare var $ : any;

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    AOS.init();
    // this.route.queryParams
    //   .subscribe(params => {
    //     document.getElementById(params['destination'])!.scrollIntoView()
    //   }
    //   );
  }

  body = document.body;
  html = document.documentElement;
  id = '#banner';


  height = Math.max(this.body.scrollHeight, this.body.offsetHeight,
    this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);

  test = this.height - 74;

  style = {
    'height': '800',
    'margin': '0',
    'background-color': '#5ca0f2',
    'background-image': 'linear-gradient(315deg, #5ca0f2 0%, #f5f7f6 74%)'
  }

  scrollDown() {
    // this.router.navigateByUrl('/secondPage/' + this.id);
    this.router.navigateByUrl('/home#banner');
    // this.router.navigate(
    //   ['/home/' + this.id],
    //   { queryParams: { destination: '#banner' } }
    // );

  //   $(window).scroll(function() {
  //     $('html, body').animate({
  //         scrollTop: $("#banner").scrollIntoView()
  //     }, 2000);
  // });
  }

}
