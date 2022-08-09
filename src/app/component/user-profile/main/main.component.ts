import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { User } from 'src/app/shared/user';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
import { Observable } from 'rxjs';
import { FirebaseCRUDService } from 'src/app/service/firebasecrudservice';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService]
})
export class MainComponent implements OnInit {

  userName: string = "";
  currentUser: any;
  userAccPage = "profile";
  person: any;
  userImage: string = "";
  name = false;

  // upload
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  // new values
  newName = "";
  newAddress = "";

  constructor(public authService: AuthService, private uploadService: FileUploadService, private firebaseService: FirebaseCRUDService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.currentUser = this.authService.getCurrentUserData();
    console.log(this.currentUser.email)

  }

  ngOnInit(): void {


    this.firebaseService.getIndividualUser(this.currentUser.email).subscribe((person: User[]) => {
      this.person = person;
      if (this.person.displayName) {
        this.name == true;
      }
    })



  }


  slide(page: string) {

    // $('.pages').toggleClass('move-right');
    $('.pages').addClass('move-right');


    setTimeout(() => {
      this.userAccPage = page;
      $('.pages').removeClass('move-right');
    }, 800)

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.currentUser.email).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  processName(name: HTMLInputElement) {
    console.log(name.value);
  }

  processLocation(location: HTMLInputElement) {

  }

  saveUserData(location: string, name: string) {
    console.log(location + " and " + name)
  }



  // toast
  showConfirm(location: string, name: string) {
    // console.log(location + " and " + name)
    this.newName = name;
    this.newAddress = location;
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirm() {
    // save new values to user profile in firebase
    this.messageService.clear('c');
  }

  onReject() {

    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

}
