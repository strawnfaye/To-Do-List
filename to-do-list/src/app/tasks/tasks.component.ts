import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService, private localSt:LocalStorageService) { }

  ngOnInit() {
    this.getTasks();
    interval(3000).subscribe(x => {
      this.store();
    })
  }

  getTasks(): void {
    this.taskService.tasks().subscribe(tasks => this.tasks = tasks);
    this.tasks = this.taskService.retrieveTasks();
    if (this.tasks == null || this.tasks.length == 0) this.addTask(); 
  }

  store(): void {
    if (this.tasks != null) this.taskService.storeTasks(this.tasks);
  }

  addTask() {
    if (this.tasks == null) this.tasks = [];
    this.tasks.push({name:"", status: false})
  }

  clearTasks() {
    this.tasks = this.tasks.filter(task => task.status == false);
  }

}
