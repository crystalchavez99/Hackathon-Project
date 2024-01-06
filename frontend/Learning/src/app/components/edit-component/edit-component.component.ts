import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.css'
})
export class EditComponentComponent implements OnInit, OnDestroy{
  id: string | null = null;
  params?: Subscription;
  course?: Course;
  editCourseSub?: Subscription;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router){}

  ngOnInit(): void{
    this.params = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get("id");
        if(this.id){
          this.courseService.getCourse(this.id)
          .subscribe({
            next: (result: Course) =>{
              this.course = result;
            }
          })
        }
      }
    })
  }

  editSubmit(){
    let updateCourse: Course = {
      name: this.course?.name || '',
      level: this.course?.level || '',
      schoolYear: this.course?.schoolYear || '',
    }
    if(this.id){
      this.editCourseSub = this.courseService.updateCourse(this.id, updateCourse)
      .subscribe({
        next: (result) =>{
          this.router.navigateByUrl(`/courses`)
        }
      })

    }
  }

  deleteCourse(): void{
    if(this.id){
      this.courseService.deleteCourse(this.id)
      .subscribe({
        next: (result) =>{
          this.router.navigateByUrl(`/courses`)
        }
      })
    }
  }
  
  ngOnDestroy(): void{
    this.editCourseSub?.unsubscribe();
  }
}
