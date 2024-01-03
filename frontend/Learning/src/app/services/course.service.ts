import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>("https://localhost:7232/api/courses");
  }

  getCourse(id:string): Observable<Course>{
    return this.http.get<Course>(`https://localhost:7232/api/courses/${id}`);
  }
  addCourse(model: Course): Observable<void>{
    return this.http.post<void>("https://localhost:7232/api/courses", model);
  }
}
