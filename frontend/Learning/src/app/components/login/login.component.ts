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
  loginTeacherSub?: Subscription;
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
        this.router.navigateByUrl('/')
      }
    });
  }

  ngOnDestroy(): void {
   this.loginTeacherSub?.unsubscribe();
  }
}
