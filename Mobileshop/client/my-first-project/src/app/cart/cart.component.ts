import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cart } from '../shared/model/Cart';
import { AuthService } from '../shared/services/auth.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  carts!: Cart[];

  columns = ['name', 'price', 'quantity'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cartService: CartService

  ) { }

  ngOnInit() {
    this.cartService.getAll().subscribe({
      next: (data) => {
        this.carts = data;
        console.log(this.carts);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (const cart of this.carts) {
      totalPrice += cart.price * cart.quantity;
    }
    alert(`Total Price: ${totalPrice}`); 
  }

  /*buy() {
    let totalPrice = 0;
    for (const cart of this.carts) {
      totalPrice += cart.price * cart.quantity;
    }
    alert(`Total Price: ${totalPrice}`); 
  }*/

  buy() {
    let totalPrice = 0;
    for (const cart of this.carts) {
      totalPrice += cart.price * cart.quantity;
      this.cartService.buyCart(cart.name).subscribe(
        response => {
          console.log(`Successfully removed one from ${cart.name} stock`);
        },
        error => {
          console.error(`Error removing one from ${cart.name} stock:`, error);
        }
      );
      this.cartService.emptyCart().subscribe(
        () => {
          console.log('Cart empty');
          // Optionally, perform additional actions after deletion
        },
        (error) => {
          console.error('Error deleting all item in cart:', error);
          // Handle error or display error message
        });
    }

    alert(`Thanks for shopping! Total Price of the purchace: ${totalPrice}`); 
  }

}
