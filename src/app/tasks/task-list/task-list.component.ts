import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { title } from 'process';
import { TaskService } from '../task.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];
  showProfileMenu = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, public authService: AuthService){}
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks;
    });
  }

  deleteTask(id: number){
    // this.tasks = this.tasks.filter(t=> t.id !==id);
    // console.log('Đã xóa công việc ra khỏi danh sách')
    if(confirm('Bạn có muốn xóa công việc khỏi danh sách')){
      this.taskService.deleteTask(id).subscribe (() => this.loadTasks())
    }
    this.saveTasks();
  }
  saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
    editTask(task:any){
    alert('Đang triển khai chức năng');
  }
    logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
    isLoggedIn(){}
    backtoList(){
      this.router.navigate(['/list'])
    }
    toggleProfileMenu(){
      this.showProfileMenu = !this.showProfileMenu;
    }
    getInitials(): string{
      const token = this.authService.getToken();
      if(!token) return 'U'
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload?.email?.charAt(0).toUpperCase() || 'U'
    }
    toggleTask(task:any){
      const updatedTask = {
        ...task, completed: !task.completed,
        completed_at : !task.completed ? new  Date() : null
      };
      this.taskService.donetask(updatedTask).subscribe(() => this.loadTasks());
      this.saveTasks();
    }
}
