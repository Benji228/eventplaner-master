import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Task} from "../shared/model/task.model";

@Component({
  selector: 'app-task-card-detailview',
  templateUrl: './task-card-detailview.component.html',
  styleUrls: ['./task-card-detailview.component.css']
})
export class TaskCardDetailviewComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {task: Task}) {
  }
}
