import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private storage:LocalStorageService) { }

  getTasks(): Observable<Task[]> {
    return this.storage.retrieve('taskList');
  }

  storeTasks(tasks: Task[]) {
    this.storage.store('taskList', tasks);
  }

  clearTasks() {
    this.storage.clear('taskList');
  }
  

}
