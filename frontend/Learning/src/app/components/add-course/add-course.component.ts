import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  model: Course;
  constructor(private courseService: CourseService){
    this.model = {
      name: '',
      level: '',
      schoolYear: ''
    }
  }
  submit(){
    this.courseService.addCourse(this.model).subscribe({
      next: (response) =>{
        console.log('Success!')
      }
    });
  }
}
