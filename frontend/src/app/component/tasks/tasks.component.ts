import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TasksService} from "../../service/tasks.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{

  possibleStatus = [
    "undefined",
    "en_attente",
    "en_cours",
    "termine"
  ]

  tasks: Array<Task> = new Array<Task>()
  error: boolean = false;

  constructor(private taskService: TasksService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => { this.tasks = data; },
      error: () => { this.error = true; }
    });
  }
  logout(): void {
    this.userService.logout().subscribe({
      next: () => { this.router.navigate(["login"]); }
    });
  }
}
