import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface product {
  id: number,
  image: string,
  name: string,
  oldPrice: number,
  newPrice: number,
  rating: number,
  numReviews: string
}


@Component({
  selector: 'app-test-carousel',
  templateUrl: './test-carousel.component.html',
  styleUrls: ['./test-carousel.component.scss']
})
export class TestCarouselComponent implements OnInit {

  test = "24"

  products: product[] = [
    {
      id: 0,
      image: "https://i5.walmartimages.com/asr/d9c259ca-bcda-48ab-aab1-b334ce0c6021_1.59243493546490ec8e379b64a36566ef.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      name: "White Bucket Hat",
      oldPrice: 30,
      newPrice: 20,
      rating: 5,
      numReviews: "1K"
    },
    {
      id: 1,
      image: "../../../assets/img/models/clown-hat/clown_hat.png",
      name: "Clown Hat",
      oldPrice: 39,
      newPrice: 50,
      rating: 4,
      numReviews: "200"
    },
    {
      id: 2,
      image: "../../../assets/img/models/earing/earing.png",
      name: "Earring",
      oldPrice: 85,
      newPrice: 75,
      rating: 4,
      numReviews: "150"
    },
    {
      id: 3,
      image: "../../../assets/img/models/glasses/glasses.png",
      name: "Swagg Glasses",
      oldPrice: 20,
      newPrice: 13,
      rating: 4,
      numReviews: "538"
    },
    {
      id: 4,
      image: "../../../assets/img/models/headphone/headphone.png",
      name: "Headphones",
      oldPrice: 160,
      newPrice: 125,
      rating: 5,
      numReviews: "1.7k"
    },
    {
      id: 5,
      image: "../../../assets/img/models/necklace/necklace.png",
      name: "Necklace",
      oldPrice: 90,
      newPrice: 80,
      rating: 5,
      numReviews: "727"
    },
  ]

  responsiveOptions: any;

  constructor(private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
  }


  initiateAR(id: number) {
    let item: any;

    if (id == 0) {
      item = "hat";
    } else if (id == 1) {
      item = "hat1";
    } else if (id == 2) {
      item = "earring";
    } else if (id == 3) {
      item = "glasses1";
    } else if (id == 4) {
      item = "headphone";
    } else if (id == 5) {
      item = "necklace";
    }
    // this.router.navigate(['/testAR/' + item]);

    // link to the static page AR in src folder
    // window.location.href = "../../../ar.html?item=" + item, "_blank";
    window.open("../../../ar.html?item=" + item, "_blank");
  }
}
