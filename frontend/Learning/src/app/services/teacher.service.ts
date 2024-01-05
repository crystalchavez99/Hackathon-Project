import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }

  registerTeacher(model: Teacher): Observable<Teacher>{
    return this.http.get<Teacher>(`https://localhost:7232/api/teachers/register`);
  }

  loginTeacher(model: Teacher): Observable<Teacher>{
    return this.http.get<Teacher>(`https://localhost:7232/api/teachers/login`);
  }
}
