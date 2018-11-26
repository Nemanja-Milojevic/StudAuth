import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../classroom.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  items = [
    {
      title: 'Classes',
      expanded: false,
      children: [
        {
          title: 'All classes',
          link: '/class',
        },
        {
          title: 'Add class',
          link: '/addclass'
        }
      ],
    },
    {
      title: 'Students',
      expanded: false,
      children: [
        {
          title: 'All students',
          link: '/index',
        }
      ],
    }
  ]

  public id
  public students

  constructor(private router: Router, private cls: ClassroomService, private auth: AuthService) { }

  ngOnInit() {
    this.cls.currentMessage.subscribe(message => this.id = message)
    setTimeout(() => {
      this.get()
    }, 200);
  }

  get(){
    this.cls.getByClassId(this.id).subscribe(res => this.students = res)
  }

  deleteStudent(id){
    this.auth.delete(id).subscribe(
      res => {
        console.log(res)
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
    setTimeout(() => {
      this.get()
    }, 200);
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
