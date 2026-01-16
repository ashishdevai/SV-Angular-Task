import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Admin {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';


  constructor(private http: HttpClient) {}
  //API Method - Get Put Patch Delete Post

  // Get User List
  getUsers(): Observable<any[]> {
    // return this.http.get<any[]>(this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }

}
