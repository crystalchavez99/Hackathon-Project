import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit{
  id: string | null = null;
  course?: Course;
  params?: Subscription;
  faPencil = faPencilAlt;

  constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.params = this.route.paramMap.subscribe({
      next: params =>{
        this.id = params.get('id');
        if(this.id){
          this.courseService.getCourse(this.id)
          .subscribe({
            next: (result: Course) =>{
              this.course = result;
              console.log(this.course)
            }
          })
        }
      }
    })
  }
}
