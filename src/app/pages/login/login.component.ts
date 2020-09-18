import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../core/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  loading = false;
  error: string;
  model: any = {
    login: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit(): void {

  }

  login(): any {
    this.loading = true;
    this.authenticationService.login(this.model.login, this.model.password)

      .subscribe(
        res => {
          this.loading = false;
          if (res) {
            window.location.href = '/';
          } else {
            this.error = 'Username or password is invalid!';
          }
        },
        error => {
          this.error = '';
          if (error && error.error && error.error.errors) {

            for (const key in error.error.errors) {
              if (key) {
                error.error.errors[key].map((err, i) => {
                  if (i > 0) {
                    err += `and ${err}`;
                  }
                  this.error += err;
                });
              }
            }
          } else {
            this.error = 'Username or password is invalid!';
          }
          this.loading = false;
        });

  }
}
