import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Пример: роль хранится в токене или в localStorage (упрощённо)
    const token = this.authService.getToken();
    if (token) {
      // Пример простого парсинга JWT (без проверки подписи)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === 'ADMIN') {
          return true;
        }
      } catch (e) {}
    }
    // Если не админ — редирект на /forbidden
    return this.router.createUrlTree(['/forbidden']);
  }
}
