import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  
  private url = "https://student-crude-auth.herokuapp.com/api/getall"
  // private url = "http://localhost:3000/api/getall"

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<any>(this.url)
  }
}
