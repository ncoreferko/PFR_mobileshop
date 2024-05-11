import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'mobile', loadComponent: () => import('./mobile/mobile.component').then((c) => c.MobileComponent)},
    { path: 'mobile-add', loadComponent: () => import('./mobile-add/mobile-add.component').then((c) => c.MobileAddComponent), canActivate: [authGuard] },
    { path: 'cart', loadComponent: () => import('./cart/cart.component').then((c) => c.CartComponent), canActivate: [authGuard] },
    { path: 'review', loadComponent: () => import('./review/review.component').then((c) => c.ReviewComponent) },
    { path: 'review-add', loadComponent: () => import('./review-add/review-add.component').then((c) => c.ReviewAddComponent) , canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
