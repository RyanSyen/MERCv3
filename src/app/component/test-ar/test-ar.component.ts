import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-ar',
  templateUrl: './test-ar.component.html',
  styleUrls: ['./test-ar.component.scss']
})
export class TestARComponent implements OnInit {

  item: any;
  visibles: any;

  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => {
      this.item = params.get('item');


      console.log("user id = " + this.item)
    });

    const visiblesOpt = [];
    document.getElementById(this.item)!.style.display = "inline";
    visiblesOpt.push(true);
    this.visibles = true;

    const setVisible = (button: any, entities: any, visible: any) => {
      if (visible) {
        console.log("run set visible is true")
        button.classList.add("selected");
      } else {
        console.log("run set visible is false")
        button.classList.remove("selected");
      }
      entities.setAttribute("visible", visible);
      // entities.forEach((entity:any) => {
      //   entity.setAttribute("visible", visible);
      // });
    }
    // list.forEach((item, index) => {
    const button = document.querySelector("#" + this.item);
    // const entities = document.querySelectorAll("." + item + "-entity");
    const entities = document.querySelector("." + this.item + "-entity");

    // setVisible(button, entities, this.visibles[index]);
    setVisible(button, entities, this.visibles);

    button?.addEventListener('click', () => {

      this.visibles = !this.visibles;
      setVisible(button, entities, this.visibles);
    });
    // });
  }

}
