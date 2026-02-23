import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Admin } from '../services/admin';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private _router: Router, private adminServise: Admin) {

  }

login() {
  console.log('Email:', this.email);
  console.log('Password:', this.password);
  console.log('Remember Me:', this.rememberMe);

  // 1️⃣ Create FormData object
  const formData = new FormData();

  // 2️⃣ Append fields (key names must match backend)
  formData.append('Username', this.email);
  formData.append('Password', this.password);
  // formData.append('RememberMe', this.rememberMe ? 'true' : 'false');

  // 3️⃣ Send FormData to API
  this.adminServise.login(formData).subscribe(
    (response: any) => {
      console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
      sessionStorage.setItem('adminData', JSON.stringify(response));
      this._router.navigate(['/admin/dashboard']);
    },
    (error) => {
      console.error('Login failed:', error);
    }
  );
}



}
