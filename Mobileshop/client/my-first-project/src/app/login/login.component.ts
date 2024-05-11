import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private router: Router,
     private authService: AuthService,
     private cartService: CartService
    ) { }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.email && this.password) {
        this.errorMessage = '';
        this.authService.login(this.email, this.password).subscribe({
          next: (data) => {
            if (data) {
              // navigation
              console.log(data);
              this.isLoading = false;
              this.router.navigateByUrl('/mobile');

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
          }, error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        })
      } else {
        this.isLoading = false;
        this.errorMessage = 'Form is empty.';
      }
    }, 1500);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
