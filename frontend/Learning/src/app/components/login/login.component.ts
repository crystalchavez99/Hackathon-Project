import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnChanges {
  model: any;
  loggedIn = false;
  loginTeacherSub?: Subscription;
  loginStudentSub?: Subscription;
  //static loggedIn: any = false;
  constructor(private teacherService: TeacherService, private router: Router, private studentService: StudentService){
    this.model ={
      name: '',
      email: '',
      password: ''
    }
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  submit(){
    this.loginTeacherSub = this.teacherService.loginTeacher(this.model).subscribe({
      next: (response) =>{
        this.loggedIn = true;
        this.router.navigateByUrl('/')
      },
      error: (e) =>{
      }
    });
    this.loginStudentSub = this.studentService.loginStudent(this.model).subscribe({
      next: (response) =>{
        this.loggedIn = true;
        this.router.navigateByUrl('/')
      },
      error: (e) =>{
      }
    });
  }

  ngOnDestroy(): void {
   this.loginTeacherSub?.unsubscribe();
  }
}
