import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  constructor(private uploadService: FileUploadService) { }
  ngOnInit(): void {
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
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
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

}
