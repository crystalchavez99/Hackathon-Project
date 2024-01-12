import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/appuser';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private currentStudent = new BehaviorSubject<AppUser | null>(null);
  currentStudent$ = this.currentStudent.asObservable();

  constructor(private http:HttpClient) { }
  registerStudent(model: Student): Observable<void>{
    return this.http.post<void>(`${environment.baseApiUrl}/api/students/register`,model);
  }

  loginStudent(model: any): Observable<void>{
    return this.http.post<AppUser>(`${environment.baseApiUrl}/api/students/login`,model).pipe(
      map((response: any) =>{
        const student = response;
        if(student){
          localStorage.setItem('user', JSON.stringify(student))
          this.currentStudent.next(student);
        }
      })
    );
  }

  getStudent(email: string): Observable<Student>{
    return this.http.get<Student>(`${environment.baseApiUrl}/api/students/${email}`);
  }

  setCurrentStudent(student: AppUser){
    this.currentStudent.next(student);
  }

  logoutStudent(){
    localStorage.removeItem('user');
  }
}
