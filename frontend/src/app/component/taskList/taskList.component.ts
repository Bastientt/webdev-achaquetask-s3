import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
@Component({
  selector: 'taskList',
  templateUrl: './taskList.component.html',
  styleUrls: ['./taskList.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() status: string = "undefined";
  @Input() tasks: Array<Task> = new Array<Task>();

  newTask: Task = {
    title: '',
    finished: false,
    status: this.status
  };

  error: boolean = false;
  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.newTask.status = this.status;
  }

  add(): void {
    this.taskService.addTask(this.newTask).subscribe({
      next: (data) => {
        this.tasks.push(data);
        this.newTask.title = '';
        this.refreshTasks();
      }
    });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(currentTask => currentTask._id !== task._id);
      }
    });
  }

  update(task: Task): void {
    const modifiedTask: Task = {
      title: task.title,
      finished: !task.finished,
      status: this.status
    };
    this.taskService.updateTask(task, modifiedTask).subscribe({
      next: () => { console.log("ok"); }
    });
  }

  private refreshTasks(): void {
    this.tasks = this.tasks.filter(currentTask => currentTask._id == currentTask._id);
  }
}
