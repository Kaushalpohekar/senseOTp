import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private router: Router) {}

  username: string = "otp@senselive.com";
  password: string = "Pass@123";

  login(loginData: any): Observable<{ status: number, data?: any }> {
    if (loginData.Username === this.username && loginData.Password === this.password) {
      // Credentials are valid, generate a random token and return it as JSON with status code 200
      const token = this.generateRandomToken(32); // Generate a 32-character random token
      this.setToken(token); // Set the token
      return of({ status: 200, data: { token } }); // Return JSON with the token and status code 200
    } else {
      // Check various error cases and return corresponding status codes and messages
      if (loginData.username !== this.username) {
        return of({ status: 404, data: { message: 'Username not found' } });
      } else if (loginData.password !== this.password) {
        return of({ status: 401, data: { message: 'Password is incorrect' } });
      } else {
        return of({ status: 500, data: { message: 'Internal error' } });
      }
    }
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private generateRandomToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
}
