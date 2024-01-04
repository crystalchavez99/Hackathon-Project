import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'courses/add',
    component: AddCourseComponent
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'courses/:id/edit',
    component: EditComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
