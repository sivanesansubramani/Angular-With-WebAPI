import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import your AuthService
//import { AuthService } from '../auth.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle successful login
        // Optionally save the token if your API returns one
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']); // Redirect to home page
        console.log(localStorage.getItem('token'));
      },
      (error) => {
        // Handle error
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}