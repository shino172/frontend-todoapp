import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  title: string;
  completed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private apiUrl = 'http://localhost:3000/api/tasks';
    private apiUrl = `${environment.api}/tasks`;


  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  donetask(task: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${task.id}`, task);
  }
}
