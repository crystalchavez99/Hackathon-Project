import { Component } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  model: Course;
  constructor(){
    this.model = {
      name: '',
      level: '',
      schoolYear: ''
    }
  }
  submit(){
    console.log(this.model)
  }
}
