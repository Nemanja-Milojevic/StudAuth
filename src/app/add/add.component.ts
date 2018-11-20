import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private studentData = {}

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  addStudent(){
    this.auth.add(this.studentData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/index'])
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
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }


}
