import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import {FormGroup, FormControl} from '@angular/forms';
import {TaskService} from "./shared/services/task.service";
import {Task} from "./shared/model/task.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eventplaner';

  tasks!: Task[];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    this.getTasks();
  }

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService
  ) {}

  getTasks() {
    this.taskService.getCards().subscribe({
      next: value => {
        console.log(value);
        this.tasks = value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }




}
