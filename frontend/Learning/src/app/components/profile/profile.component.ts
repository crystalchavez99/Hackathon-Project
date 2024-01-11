import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  //student: any = {};
  isStudent = false;
  isTeacher = false;
  role: any;
  constructor(private teacherService: TeacherService, private studentService: StudentService){

  }

  ngOnInit(): void{
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const userParse: any = JSON.parse(userString);
    console.log(userParse.email)
    this.teacherService.getTeacher(userParse.email)
    .subscribe({
      next: (result: Teacher) =>{
        this.user = result;
        this.role = Teacher.name;
        this.isStudent = false;
        this.isTeacher = true;
        console.log(this.user, this.role)
      }
    })
    this.studentService.getStudent(userParse.email)
    .subscribe({
      next: (result: Student) =>{
        this.user = result;
        this.isStudent = true;
        this.isTeacher = false;
        this.role = Student.name;
        console.log(this.user, this.role)
      }
    })
  }
}
