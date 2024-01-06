import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http:HttpClient) { }

  registerTeacher(model: Teacher): Observable<void>{
    console.log(model)
    return this.http.post<void>(`https://localhost:7232/api/teachers/register`,model);
  }

  loginTeacher(model: Teacher): Observable<void>{
    return this.http.post<void>(`https://localhost:7232/api/teachers/login`,model);
  }
}
