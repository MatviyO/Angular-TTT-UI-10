import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  title = 'ttt-new-ui';
  loginText = 'Login';
  signUpText = 'Sign Up';
  lessons = ['Lesson 1', 'Lessons 2'];

  login(): void {
    console.log('Login');
  }

  signUp(): void {
    console.log('Sign Up');
  }
}
