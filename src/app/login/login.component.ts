import { Component } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword: boolean = true;
  loginForm: FormGroup; // FormGroup for the entire login form
  email = this.fb.control('', [Validators.required, Validators.email]);
  password = this.fb.control('', [Validators.required]);

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Password is <strong>required</strong>';
    }
    return this.password.hasError('minlength')
      ? 'Password should be at least 8 characters long'
      : '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submitLoginForm(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const loginData = {
        Username: formData.email,
        Password: formData.password
      };

      this.AuthService.login(loginData).subscribe(
        (response) => {
          if (response.status === 200) {
            const token = response.data.token;
            this.AuthService.setToken(token);
            this.router.navigate(['/d']);
          } else {
            this.snackBar.open('Login Failed, Please Try Again', 'Dismiss', {
              duration: 2000
            });
          }
        }, 
        (error) => {
          this.snackBar.open('Login Failed, Please Try Again', 'Dismiss', {
            duration: 2000
          });
        });
    }
  }
  
}

