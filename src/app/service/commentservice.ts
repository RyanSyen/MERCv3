import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../domain/comment';

@Injectable()
export class CommentService {

    constructor(private http: HttpClient) { }

    getProduct1Comments(){
        return this.http.get<any>('assets/data/productRating.json')
        .toPromise()
        .then(res => <Comment[]>res.data)
        .then(data => { return data; });
    }

    getProduct2Comments(){
        return this.http.get<any>('assets/data/productRating.json')
        .toPromise()
        .then(res => <Comment[]>res.data1)
        .then(data1 => { return data1; });
    }

    getProduct3Comments(){
        return this.http.get<any>('assets/data/productRating.json')
        .toPromise()
        .then(res => <Comment[]>res.data2)
        .then(data2 => { return data2; });
    }
}