import { Component } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  model: any = {};
  loggedIn = false;
  loginTeacherSub?: Subscription;
  constructor(private teacherService: TeacherService, private router: Router){
    // this.model ={
    //   name: '',
    //   email: '',
    //   password: ''
    // }
  }
  ngOnInit(): void{
    this.getCurrentTeacher();
  }
  getCurrentTeacher(){
    this.teacherService.currentTeacher$.subscribe({
      next: teacher => this.loggedIn = !!teacher,
      error: error => console.log(error)
    })
  }
  submit(){
    this.loginTeacherSub = this.teacherService.loginTeacher(this.model).subscribe({
      next: (response) =>{
        console.log(response)
        this.loggedIn = true;
        //this.router.navigateByUrl('/')
      },
      error: (e) =>{
        console.log(e)
      }
    });
  }

  ngOnDestroy(): void {
   this.loginTeacherSub?.unsubscribe();
  }
  logout(){
    this.teacherService.logoutTeacher();
    this.loggedIn = false;
  }
}
