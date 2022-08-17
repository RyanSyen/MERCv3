import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import '../../../assets/js/smtp.js';

// import { HttpClient } from '@angular/common/http';

// import { SMTPClient } from 'emailjs';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

// const client = new SMTPClient({
//   user: 'user',
//   password: 'password',
//   host: 'smtp.your-email.com',
//   ssl: true,
// });


declare let Email: any;
declare function myMethod(): any;

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {

  // create a property name FormData to type FormGroup and generate form controls with FormBuilder
  // FormData!: FormGroup;

  // email: any;
  // hostEmail = "yisyen123@gmail.com"



  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
    // this.FormData = this.builder.group({
    //   Fullname: new FormControl('', [Validators.required]),
    //   Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
    //   Comment: new FormControl('', [Validators.required])
    // })
    // this.Email = myMethod();
    // console.log(this.Email)
    // this.email = Email;
  }

  // submit(customerName: any, customerEmail: any, customerMessage: any) {

  //   console.log(customerName, customerEmail, customerMessage)
  //   // this.email.send({
  //   //   Host: 'smtp.elasticemail.com',
  //   //   Username: 'yisyen123@gmail.com',
  //   //   Password: '67887E63A7756EE60D9BAE146900E1988B50',
  //   //   To: customerEmail,
  //   //   From: 'yisyen123@gmail.com',
  //   //   Subject: 'test',
  //   //   Body: customerMessage

  //   // }).then((message: any) => {
  //   //   alert(message);
  //   // }
  //   //   // console.log("done sending email to " + customerEmail);
  //   // );

  //   setTimeout(() => {
  //     try {
  //       Email.send({
  //         Host: "smtp.elasticemail.com",
  //         Username: this.hostEmail,
  //         Password: "67887E63A7756EE60D9BAE146900E1988B50",
  //         To: customerEmail,
  //         From: this.hostEmail,
  //         Subject: "This is the subject",
  //         Body: "And this is the body"
  //       }).then(
  //         (message: any) => alert(message)
  //       );
  //     } catch (err) {
  //       alert(err)
  //     }
  //   }, 5000);


  // }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_gy7oluz',
        'template_lzghp49',
        e.target as HTMLFormElement,
        'G6SN62v0YaDbxTNIQ'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          // resets the form
          let frm = document.getElementsByName('contact-form')[0] as HTMLFormElement;
          frm.reset();

          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  // .then( message => {alert(message); f.resetForm(); } );

  // form: FormGroup;
  // name: FormControl = new FormControl("", [Validators.required]);
  // email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  // message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  // honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  // submitted: boolean = false; // show and hide the success message
  // isLoading: boolean = false; // disable the submit button if we're loading
  // responseMessage: string = ""; // the response message to show to the user
  // constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  //   this.form = this.formBuilder.group({
  //     name: this.name,
  //     email: this.email,
  //     message: this.message,
  //     honeypot: this.honeypot
  //   });
  // }
  // ngOnInit(): void {
  // }
  // onSubmit(name: any, email: any, message: any) {
  //   if (this.form.status == "VALID" && this.honeypot.value == "") {
  //     this.form.disable(); // disable the form if it's valid to disable multiple submissions
  //     var formData: any = new FormData();
  //     // formData.append("name", this.form.get("name").value);
  //     // formData.append("email", this.form.get("email").value);
  //     // formData.append("message", this.form.get("message").value);
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("message", message);
  //     this.isLoading = true; // sending the post request async so it's in progress
  //     this.submitted = false; // hide the response message on multiple submits
  //     this.http.post("https://script.google.com/macros/s/AKfycbzpe9MfiXKph4Y8ybW15rEJ3SbYsWX4im7XRcP0q8ULEnluIozGBaTx0kAAbrPR5jfY/exec", formData).subscribe(
  //       (response) => {
  //         // choose the response message
  //         // if (response["result"] == "success") {
  //         //   this.responseMessage = "Thanks for the message! I'll get back to you soon!";
  //         // } else {
  //         //   this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
  //         // }
  //         this.form.enable(); // re enable the form after a success
  //         this.submitted = true; // show the response message
  //         this.isLoading = false; // re enable the submit button
  //         console.log(response);
  //       },
  //       (error) => {
  //         this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
  //         this.form.enable(); // re enable the form after a success
  //         this.submitted = true; // show the response message
  //         this.isLoading = false; // re enable the submit button
  //         console.log(error);
  //       }
  //     );
  //   }
  // }


}
