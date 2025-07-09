import { Component, OnInit } from '@angular/core';
import { MaterialModules } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { TaskService } from '../task.service';
import { routes } from '../../app.routes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  taskForm:FormGroup = new FormGroup({});
  taskId: number | null = null

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, public authService: AuthService) {
    this.taskForm = this.fb.group({ title: [''] });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  onSubmit() {
    this.taskService.addTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset();
        alert('Thêm thành công');
        this.router.navigate(['/list'])
      },
      error: (err) => {
        console.error(err);
        alert('Thêm thất bại');
      }
    });
  }
  backtoList(){
    this.router.navigate(['/list']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isLoggedIn(){}
}
