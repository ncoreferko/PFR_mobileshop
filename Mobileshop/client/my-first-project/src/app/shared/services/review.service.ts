import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../model/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Review[]>('http://localhost:5000/app/getAllReviews', {withCredentials: true});
  }

  create(review: Review) {
    const currentDate = new Date();
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('review', review.review);
    body.set('modelName', review.modelName);
    body.set('name', review.name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/review', body, {headers: headers, withCredentials: true});
  }
}
