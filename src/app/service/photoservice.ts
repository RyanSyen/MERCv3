import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Image } from '../domain/image';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }

    getFirstProductImages() {
    return this.http.get<any>('assets/data/gallery.json')
      .toPromise()
      .then(res => <Image[]>res.data)
      .then(data => { return data; });
    }

    getSecondProductImages(){
      return this.http.get<any>('assets/data/gallery.json')
      .toPromise()
      .then(res => <Image[]>res.data1)
      .then(data1 => { return data1; });
    }

    getThirdProductImages(){
      return this.http.get<any>('assets/data/gallery.json')
      .toPromise()
      .then(res => <Image[]>res.data2)
      .then(data2 => { return data2; });
    }
}