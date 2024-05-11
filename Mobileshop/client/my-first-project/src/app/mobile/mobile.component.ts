import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Mobile } from '../shared/model/Mobile';
import { MobileService } from '../shared/services/mobile.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule,  MatDialogModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.scss'
})
export class MobileComponent {
  mobiles!: Mobile[];

  columns = ['brand', 'modelName', 'price', 'inStock', 'delete', 'cart'];

  constructor(
    private mobileService: MobileService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.mobileService.getAll().subscribe({
      next: (data) => {
        this.mobiles = data;
        console.log(this.mobiles);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteMobile(id: string, n: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          // user deletion
          console.log(data);
          this.mobileService.delete(id).subscribe({
            next: (data) => {
              console.log(data);
              this.mobiles?.splice(n, 1);
              this.mobiles = [...this.mobiles];
              this.openSnackBar('Mobile deleted successfully.', 3000);
            }, error: (err) => {
              console.log(err);
            }
          });
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, undefined, { duration: duration });
  }

  addCart(name: string, price: number) {
    const productName = name; 
    const productPrice = price; 
    const productQuantity = 1; 

    const cartData = {
      name: productName,
      price: productPrice,
      quantity: productQuantity
    };
    this.cartService.add(cartData).subscribe(
      (response) => {
        console.log('Product added to cart successfully:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }


}
