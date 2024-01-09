import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppUser } from '../models/appuser';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private currentStudent = new BehaviorSubject<AppUser | null>(null);
  currentStudent$ = this.currentStudent.asObservable();

  constructor(private http:HttpClient) { }
  registerStudent(model: Student): Observable<void>{
    console.log(model)
    return this.http.post<void>(`https://localhost:7232/api/students/register`,model);
  }

  loginStudent(model: any): Observable<void>{
    return this.http.post<AppUser>(`https://localhost:7232/api/students/login`,model).pipe(
      map((response: any) =>{
        console.log(response)
        const student = response;
        if(student){
          localStorage.setItem('user', JSON.stringify(student))
          this.currentStudent.next(student);
        }
      })
    );
  }

  getStudent(email: string): Observable<Student>{
    return this.http.get<Student>(`https://localhost:7232/api/students/${email}`);
  }

  setCurrentStudent(student: AppUser){
    this.currentStudent.next(student);
  }

  logoutStudent(){
    localStorage.removeItem('user');
  }
}
