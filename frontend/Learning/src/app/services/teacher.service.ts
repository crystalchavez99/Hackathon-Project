import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Teacher } from '../models/teacher';
import { AppUser } from '../models/appuser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private currentTeacher = new BehaviorSubject<AppUser | null>(null);
  currentTeacher$ = this.currentTeacher.asObservable();


  constructor(private http:HttpClient) { }

  registerTeacher(model: Teacher): Observable<void>{
    console.log(model)
    return this.http.post<void>(`${environment.baseApiUrl}/api/teachers/register`,model);
  }

  loginTeacher(model: any): Observable<void>{
    return this.http.post<AppUser>(`${environment.baseApiUrl}/api/teachers/login`,model).pipe(
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

  getTeacher(email: string): Observable<Teacher>{
    return this.http.get<Teacher>(`${environment.baseApiUrl}/api/teachers/${email}`);
  }

  setCurrentTeacher(teacher: AppUser){
    this.currentTeacher.next(teacher);
  }

  logoutTeacher(){
    localStorage.removeItem('user');
  }
}
