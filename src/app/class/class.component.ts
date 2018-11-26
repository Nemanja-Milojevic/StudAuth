import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../classroom.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public classes

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

  constructor(private cls: ClassroomService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.get()
    }, 200);
  }

  get(){
    this.cls.get().subscribe(
      res => this.classes = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
      )
  }

  deleteClass(id){
    this.cls.delete(id).subscribe(
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
    this.cls.updateDel(id).subscribe(
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

  addStudent(id) {
    this.cls.changeMessage(id)
    this.router.navigate(['/add'])
  }

  showStudents(id) {
    this.cls.changeMessage(id)
    this.router.navigate(['/students'])
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
