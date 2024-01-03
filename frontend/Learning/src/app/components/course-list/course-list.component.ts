import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  courses: Course[] = [];

  constructor(private courseService: CourseService){}
  ngOnInit(): void{
    this.courseService.getCourses().subscribe((result: Course[])=>{
      this.courses = result;
    })
  }
}
