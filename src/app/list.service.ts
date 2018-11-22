import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private getUrl = `http://localhost:${process.env.PORT}/api/getall`

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<any>(this.getUrl)
  }
}
