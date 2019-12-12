import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isLogin = localStorage.getItem('isLogin');
        console.log('is login---', isLogin);
        if (!isLogin || isLogin == 'false') {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
  }
}
