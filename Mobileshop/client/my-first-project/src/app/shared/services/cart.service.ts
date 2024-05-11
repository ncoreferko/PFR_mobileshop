import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../model/Cart';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Cart[]>('http://localhost:5000/app/getCart', {withCredentials: true});
  }

  emptyCart() {
    return this.http.delete('http://localhost:5000/app/emptyCart', { withCredentials: true });
  }

  add(cart: Cart) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', cart.name);
    body.set('price', cart.price.toString());
    body.set('quantity', cart.quantity.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/cart', body, {headers: headers, withCredentials: true});
  }

  buyCart(modelName: string) {
    return this.http.put(`http://localhost:5000/app/buyCart?modelName=` + modelName, { withCredentials: true });
  }

}
