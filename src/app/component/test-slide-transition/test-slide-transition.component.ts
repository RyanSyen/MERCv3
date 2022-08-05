import { Component, OnInit } from '@angular/core';
// import {AngularFireStorage} from '@angular/fire/storage'
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-test-slide-transition',
  templateUrl: './test-slide-transition.component.html',
  styleUrls: ['./test-slide-transition.component.scss']
})
export class TestSlideTransitionComponent implements OnInit {

  pages = document.querySelectorAll(".page");
  test = document.getElementById("page");
  test1 = document.querySelectorAll('[id^=page')
  translateAmount = 100;
  translate = 0;

  filePath: String = "";

  constructor(private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  slide(direction: string) {

    // need to include <HTMLElement> return type in order to use forEach 
    let test3 = document.querySelectorAll<HTMLElement>(".page");

    direction === "next" ? this.translate -= this.translateAmount : this.translate += this.translateAmount;


    test3.forEach(
      test => (test.style.transform = `translateX(${this.translate}%)`)
    );
  }

  upload(event: any) {
    this.filePath = event.target.files[0]
  }
  uploadImage() {
    console.log(this.filePath)
    this.afStorage.upload('/images' + Math.random() + this.filePath, this.filePath);
  }

}

