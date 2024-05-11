import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MobileComponent } from './mobile/mobile.component';
import { MobileAddComponent } from './mobile-add/mobile-add.component';
import { CartComponent } from './cart/cart.component';
import { ReviewComponent } from './review/review.component';
import { ReviewAddComponent } from './review-add/review-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    LoginComponent,
    SignupComponent,
    MobileComponent,
    MobileAddComponent,
    CartComponent,
    ReviewComponent,
    ReviewAddComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-project test';
}
