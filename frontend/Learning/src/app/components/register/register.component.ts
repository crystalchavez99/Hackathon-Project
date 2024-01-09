import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: Teacher | Student;
  registerTeacherSub?: Subscription;
  registerStudentSub?: Subscription;
  isStudent = false;
  isTeacher = false;
  errors: any;
  constructor(private teacherService: TeacherService, private router: Router, private studentService: StudentService){
    this.model ={
      name: '',
      email: '',
      password: ''
    }
  }
  submit(){
    if(this.isTeacher == true){
      this.registerTeacherSub = this.teacherService.registerTeacher(this.model).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/')
        },
        error: e =>{
          this.errors = e.error.errors;
        }
      });
    }else if(this.isStudent == true){
      this.registerStudentSub = this.studentService.registerStudent(this.model).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/')
        },
        error: e =>{
          this.errors = e.error.errors;
        }
      });
    }

  }

  ngOnDestroy(): void {
   this.registerTeacherSub?.unsubscribe();
   this.registerStudentSub?.unsubscribe();
  }

  teacherRole(){
    this.isTeacher = true;
    this.isStudent = false;
  }
  studentRole(){
    this.isTeacher = false;
    this.isStudent = true;
  }
}
