import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  // create a property name FormData to type FormGroup and generate form controls with FormBuilder
  FormData!: FormGroup;

  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    // this.FormData = this.builder.group({
    //   Fullname: new FormControl('', [Validators.required]),
    //   Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    //   Comment: new FormControl('', [Validators.required])
    // })
  }

}
