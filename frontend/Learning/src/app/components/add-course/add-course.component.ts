import { Component, OnDestroy } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnDestroy{
  model: Course;
  private addCourseSub?: Subscription;
  constructor(private courseService: CourseService){
    this.model = {
      name: '',
      level: '',
      schoolYear: ''
    }
  }

  submit(){
    this.addCourseSub = this.courseService.addCourse(this.model).subscribe({
      next: (response) =>{
        console.log('Success!')
      }
    });
  }

  ngOnDestroy(): void {
   this.addCourseSub?.unsubscribe();
  }
}
