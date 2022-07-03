import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  currentRate = 4.5;

  rating = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
