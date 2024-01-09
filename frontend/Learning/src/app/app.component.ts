import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TeacherService } from './services/teacher.service';
import { AppUser } from './models/appuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Learning';
  users: any;
  constructor(private http: HttpClient, private teacherService: TeacherService){};

  ngOnInit(): void{
    this.setCurrentUser();
  }
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: AppUser = JSON.parse(userString);
    this.teacherService.setCurrentTeacher(user);
  }
}
