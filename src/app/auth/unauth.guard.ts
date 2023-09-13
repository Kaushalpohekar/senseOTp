import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router) {}


  canActivate(): boolean {
  const isLoggedIn = this.AuthService.isLoggedIn();
  const storedToken = sessionStorage.getItem('token');
  if (isLoggedIn && storedToken) {
    this.router.navigate(['/d']);
    return false; 
  }
  return true;
}

  
}
