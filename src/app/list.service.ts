import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private getUrl = "https://student-crude-auth.herokuapp.com/api/getall";

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<any>(this.getUrl)
  }
}
