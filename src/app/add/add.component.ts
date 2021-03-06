import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ClassroomService } from '../classroom.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public studentData = {
    name: null,
    surname: null,
    email: null,
    password: null,
    index: null,
    class_id: null
  }

  public message

  constructor(private auth: AuthService, private router: Router, private cls: ClassroomService) { }

  ngOnInit() {
    this.cls.currentMessage.subscribe(message => this.message = message)
    this.studentData.class_id = this.message
  }

  addStudent(){
    this.auth.add(this.studentData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/class'])
        this.studentData = null
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }


}
