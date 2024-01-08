import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: Teacher;
  loggedIn = false;
  loginTeacherSub?: Subscription;
  //static loggedIn: any = false;
  constructor(private teacherService: TeacherService, private router: Router){
    this.model ={
      name: '',
      email: '',
      password: ''
    }
  }
  submit(){
    this.loginTeacherSub = this.teacherService.loginTeacher(this.model).subscribe({
      next: (response) =>{
        console.log(response)
        this.loggedIn = true;
        this.router.navigateByUrl('/')
      },
      error: (e) =>{
        console.log(e)
      }
    });
  }

  ngOnDestroy(): void {
   this.loginTeacherSub?.unsubscribe();
  }
}
