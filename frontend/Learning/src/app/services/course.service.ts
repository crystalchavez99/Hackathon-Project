import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http:HttpClient) { }

  getCourses(teacherId: number): Observable<Course[]>{
    return this.http.get<Course[]>(`https://localhost:7232/api/courses?teacherId=${teacherId}`);
  }

  getCourse(id:string): Observable<Course>{
    return this.http.get<Course>(`https://localhost:7232/api/courses/${id}`);
  }
  addCourse(model: Course): Observable<void>{
    console.log(model)
    return this.http.post<void>("https://localhost:7232/api/courses", model);
  }
  deleteCourse(id:string): Observable<void>{
    return this.http.delete<void>(`https://localhost:7232/api/courses/${id}`)
  }
  updateCourse(id: string, model: Course): Observable<Course>{
    return this.http.put<Course>(`https://localhost:7232/api/courses/${id}`, model)
  }
}
