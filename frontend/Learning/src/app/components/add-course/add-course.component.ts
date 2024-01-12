import { Component, OnDestroy } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnDestroy{
  model: any = {};
  teacher: any = {};
  errors: any;
  addCourseSub?: Subscription;
  constructor(private courseService: CourseService, private router: Router, private teacherService: TeacherService){
  }
  ngOnInit(): void{
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const userParse: any = JSON.parse(userString);
    this.teacherService.getTeacher(userParse.email)
    .subscribe({
      next: (result: Teacher) =>{
        this.teacher = result;
      }
    })
  }

  submit(){
    this.model.teacherId = this.teacher.id;
    this.addCourseSub = this.courseService.addCourse(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/courses')
      },
      error: e =>{
        this.errors = e.error.errors;
      }
    });
  }

  ngOnDestroy(): void {
   this.addCourseSub?.unsubscribe();
  }
  cancelEdit(): void{
    this.router.navigateByUrl(`/courses`)
  }
}
