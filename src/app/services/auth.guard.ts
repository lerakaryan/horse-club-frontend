import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Если токен есть — разрешаем доступ, иначе редирект на /login
    if (this.authService.getToken()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
}
