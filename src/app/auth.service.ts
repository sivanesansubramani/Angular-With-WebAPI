import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7088'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  HomePageData(token: string): Observable<any> {
    debugger;
    //const apiUrl = 'your-api-url-here';  // Replace with your actual API URL
    return this.http.get(`${this.apiUrl}/HomePage`,{ params: {token} });
  }

  logout(): void {
    debugger;
    // Clear token from localStorage
    localStorage.removeItem('token');    
    // Optionally, clear other user-related data from localStorage or sessionStorage
    //localStorage.removeItem('userData'); // if you have any user data stored    
    this.router.navigate(['/login']);
    // Optionally, you can show a message to the user
    console.log('User has been logged out.');
  }

}