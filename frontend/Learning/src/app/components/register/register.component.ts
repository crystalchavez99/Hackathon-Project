import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: Teacher;
  registerTeacherSub?: Subscription;
  constructor(private teacherService: TeacherService, private router: Router){
    this.model ={
      name: '',
      email: '',
      password: ''
    }
  }
  submit(){
    this.registerTeacherSub = this.teacherService.registerTeacher(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/')
      }
    });
  }

  ngOnDestroy(): void {
   this.registerTeacherSub?.unsubscribe();
  }
}
