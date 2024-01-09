import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  courses: Course[] = [];
  teacher: any = {};
  constructor(private courseService: CourseService, private router: Router,private teacherService: TeacherService){}
  ngOnInit(): void{
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const userParse: any = JSON.parse(userString);
    console.log(userParse.email)
    this.teacherService.getTeacher(userParse.email)
    .subscribe({
      next: (result: Teacher) =>{
        this.teacher = result;
        this.courseService.getCourses(this.teacher.id).subscribe((result: Course[])=>{
          this.courses = result;
        })
      }
    })
  }

}
