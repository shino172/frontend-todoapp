import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: {email: string; password: string}){
    return this.http.post(`${API_URL}/signup`, data);
  }

  login(data: {email: string; password: string} ) {
    return this.http.post<{token: string}>(`${API_URL}/login`, data);
  }


  getToken():string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
    saveToken(token: string){
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
  logout(){
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  isLoggedIn():boolean{
    return !!this.getToken();
  }
}
