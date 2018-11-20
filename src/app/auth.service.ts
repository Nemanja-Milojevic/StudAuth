import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "http://localhost:3000/api/add";
  private loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient) { }

  add(data){
    return this.http.post<any>(this.registerUrl, data)
  }

  login(data){
    return this.http.post<any>(this.loginUrl, data)
  }

  delete(data){
    return this.http.delete<any>(`http://localhost:3000/api/${data}/delete`, httpOptions)
  }

  update(id, data){
    return this.http.put<any>(`http://localhost:3000/api/${id}/update`, data, httpOptions)
    }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
