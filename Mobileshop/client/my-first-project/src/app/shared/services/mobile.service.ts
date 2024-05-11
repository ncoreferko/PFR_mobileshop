import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mobile } from '../model/Mobile';


@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Mobile[]>('http://localhost:5000/app/getMobiles', {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteMobile?id=' + id, {withCredentials: true});
  }

  addCart(id: string) {
    return this.http.delete('http://localhost:5000/app/addCart?id=' + id, {withCredentials: true});
  }

  register(mobile: Mobile) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('brand', mobile.brand);
    body.set('modelName', mobile.modelName);
    body.set('price', mobile.price.toString());
    body.set('inStock', mobile.inStock.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/mobiles', body, {headers: headers, withCredentials: true});
  }
}
