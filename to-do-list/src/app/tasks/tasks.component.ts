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
    this.tasks = [];
    this.addTask();
    this.getTasks();
    this.localSt.observe('taskList').subscribe((value) => console.log('new task', value));
    interval(3000).subscribe(x => {
      this.store();
    })
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  store(): void {
    this.taskService.storeTasks(this.tasks);
  }

  addTask() {
    this.tasks.push({name:"", status: false})
  }

  clearTasks() {
    this.taskService.clearTasks();
  }

}
