import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  userName: string = "";
  user: any;

  constructor(public authService: AuthService) {


  }

  ngOnInit(): void {


  }

}
