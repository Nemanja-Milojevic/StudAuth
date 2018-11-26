import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

  // private url = "https://student-crude-auth.herokuapp.com/api/"
  private url = "http://localhost:3000/api/"

  constructor(private http: HttpClient) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  add(data){
    return this.http.post<any>(this.url + 'addclass', data)
  }

  get(){
    return this.http.get<any>(this.url + 'getclass')
  }

  getByClassId(id){
    return this.http.get<any>(this.url + `${id}/getstudentbyclassid`)
  }

  delete(data){
    return this.http.delete<any>(this.url + `${data}/deleteclass`, httpOptions)
  }

  updateDel(data){
    return this.http.put<any>(this.url + `${data}/updatedel`, httpOptions)
  }
}
