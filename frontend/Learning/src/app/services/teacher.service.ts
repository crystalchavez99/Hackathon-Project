import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Teacher } from '../models/teacher';
import { AppUser } from '../models/appuser';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private currentTeacher = new BehaviorSubject<AppUser | null>(null);
  currentTeacher$ = this.currentTeacher.asObservable();

  constructor(private http:HttpClient) { }

  registerTeacher(model: Teacher): Observable<void>{
    console.log(model)
    return this.http.post<void>(`https://localhost:7232/api/teachers/register`,model);
  }

  loginTeacher(model: any): Observable<void>{
    return this.http.post<AppUser>(`https://localhost:7232/api/teachers/login`,model).pipe(
      map((response: any) =>{
        console.log(response)
        const teacher = response;
        if(teacher){
          localStorage.setItem('user', JSON.stringify(teacher))
          this.currentTeacher.next(teacher);
        }
      })
    );
  }

  setCurrentTeacher(teacher: AppUser){
    this.currentTeacher.next(teacher);
  }

  logoutTeacher(){
    localStorage.removeItem('user');
  }
}
