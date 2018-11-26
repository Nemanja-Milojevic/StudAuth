import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from '../classroom.service';

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
        },
        {
          title: 'Add student',
          link: '/add'
        }
      ],
    }
  ]

  public id
  public students

  constructor(private router: Router, private cls: ClassroomService) { }

  ngOnInit() {
    this.cls.currentMessage.subscribe(message => this.id = message)
    this.get()
  }

  get(){
    this.cls.getByClassId(this.id).subscribe(res => this.students = res)
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
