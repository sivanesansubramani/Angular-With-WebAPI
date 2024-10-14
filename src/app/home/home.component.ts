import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';  // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = []; // Initialize as an array
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token'); // Get the token from local storage
    debugger;
    
    if (token) {
      this.authService.HomePageData(token).subscribe(
        (response) => {
          // Assuming the response is an array of objects
          this.data = Array.isArray(response) ? response : [response];
          console.log('Data fetched:', this.data);
    
          if (Array.isArray(response)) {
            this.data = response; // Store the array in data
          } else {
            console.error('Expected an array but got:', response);
          }
        },
        
        (error) => {
          console.error('Error fetching data', error);
          debugger;
  
          // Check if the error message indicates token expiration or invalid token
          if (error.status === 400 && error.error === 'Invalid token.') {
            console.error('Token invalid or expired, redirecting to login...');
            this.authService.logout(); // Clear token and log out
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            // Handle other errors
            this.errorMessage = 'Failed to fetch data. Please try again later.';
          }
        }
      );
    } else {
      console.error('No token found in local storage');
      this.errorMessage = 'No token found. Please log in again.';
      this.authService.logout(); // Optionally log out if no token is found
      this.router.navigate(['/login']); // Redirect to login page
    }
  }
  
  


}
