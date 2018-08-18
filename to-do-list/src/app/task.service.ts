import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private storage:LocalStorageService) { }

  tasks(): Observable<Task[]> {
    return this.storage.observe('taskList');
  }

  retrieveTasks():Task[] {
    return this.storage.retrieve('taskList');
  }

  storeTasks(tasks: Task[]) {
    this.storage.store('taskList', tasks);
  }
  
}
