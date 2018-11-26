import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../classroom.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent implements OnInit {

  public classData = {
    name: null
  }

  constructor(private cls: ClassroomService, private router: Router) { }

  ngOnInit() {
  }

  addClass(){
    this.cls.add(this.classData).subscribe(
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/login'])
          }
        }
      }
    )
    this.router.navigate(['/class'])
    this.classData = null
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
