import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginData = {}

  constructor(private auth: AuthService, private router: Router, private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.loginData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/index'])
        console.log(res)
      },
      err => {
        this.showToast()
        console.log(err)
      }
    )
  }

  showToast() {    
    let status = 'warning' as  NbToastStatus
    this.toastrService.show('Wrong info', 'Warning', { status });
  }

}

