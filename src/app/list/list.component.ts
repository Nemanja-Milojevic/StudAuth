import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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

  public listOfStudents;
  public loggedIn;

  constructor(private listApi: ListService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    setTimeout(() => {
      this.get()
    }, 200);
  }

  get(){
    this.listApi.getStudents().subscribe(
      res => this.listOfStudents = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
      )
  }

  getLogged(){
    this.auth.getLoggedIn().subscribe(
      res => this.loggedIn = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
      )
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
