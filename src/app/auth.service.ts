import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private url = "https://student-crude-auth.herokuapp.com/api/"
  private url = "http://localhost:3000/api/"

  constructor(private http: HttpClient) { }

  add(data){
    return this.http.post<any>(this.url + 'add', data)
  }

  login(data){
    return this.http.post<any>(this.url + 'login', data)
  }

  delete(data){
    return this.http.delete<any>(this.url + `${data}/delete`, httpOptions)
  }

  update(id, data){
    return this.http.put<any>(this.url + `${id}/update`, data, httpOptions)
    }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
