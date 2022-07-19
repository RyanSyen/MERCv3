import { CommentService } from './../../../service/commentservice';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() productId: any;

  currentRate = 4.5;

  rating = 5;

  comment: any;

  ratingArr: any = [];
  ratingVar!: any;
  count: number = 0;
  sum!: number;
  s5: number = 0;
  s4: number = 0;
  s3: number = 0;
  s2: number = 0;
  s1: number = 0;


  constructor(private commentService: CommentService) { }

  ngOnInit(): void {

    if (this.productId == "1000") {
      this.commentService.getProduct1Comments().then(comment => {
        this.comment = comment;
        this.comment.forEach((array: any) => {
          this.ratingArr.push(array.rating);
          this.count++;
        });
        this.ratingArr.forEach((num: any) => {
          if (num == 5) {
            this.s5++;
          } else if (num == 4) {
            this.s4++;
          } else if (num == 3) {
            this.s3++;
          } else if (num == 2) {
            this.s2++;
          } else if (num == 1) {
            this.s1++;
          }
        });
        if (this.s5 == this.count) {
          this.rating = this.rating * 1;
          this.currentRate = this.rating;
        } else {
          this.rating = this.rating * (this.s5 / this.count);
          this.currentRate = this.rating;
        }
      });
    } else if (this.productId == "1001") {
      this.commentService.getProduct2Comments().then(comment => {
        this.comment = comment;
        this.comment.forEach((array: any) => {
          this.ratingArr.push(array.rating);
          this.count++;
        });
        this.ratingArr.forEach((num: any) => {
          if (num == 5) {
            this.s5++;
          } else if (num == 4) {
            this.s4++;
          } else if (num == 3) {
            this.s3++;
          } else if (num == 2) {
            this.s2++;
          } else if (num == 1) {
            this.s1++;
          }
        });
        if (this.s5 == this.count) {
          this.rating = this.rating * 1;
          this.currentRate = this.rating;
        } else {
          this.rating = this.rating * (this.s5 / this.count);
          this.currentRate = this.rating;
        }
      });
    } else if (this.productId == "1002") {
      this.commentService.getProduct3Comments().then(comment => {
        this.comment = comment;
        this.comment.forEach((array: any) => {
          this.ratingArr.push(array.rating);
          this.count++;
        });
        this.ratingArr.forEach((num: any) => {
          if (num == 5) {
            this.s5++;
          } else if (num == 4) {
            this.s4++;
          } else if (num == 3) {
            this.s3++;
          } else if (num == 2) {
            this.s2++;
          } else if (num == 1) {
            this.s1++;
          }
        });
        if (this.s5 == this.count) {
          this.rating = this.rating * 1;
          this.currentRate = this.rating;
        } else {
          this.rating = this.rating * (this.s5 / this.count);
          this.currentRate = this.rating;
        }
      });
    }





  }

}
