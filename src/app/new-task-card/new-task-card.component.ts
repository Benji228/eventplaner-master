import {Component, Input} from '@angular/core';
import {Task} from "../shared/model/task.model";
import {MatDialog} from '@angular/material/dialog';
import { TaskCardDetailviewComponent } from '../task-card-detailview/task-card-detailview.component';

@Component({
  selector: 'app-new-task-card',
  templateUrl: './new-task-card.component.html',
  styleUrls: ['./new-task-card.component.css']
})
export class NewTaskCardComponent {

  @Input() task!: Task;

  constructor(
    private dialog: MatDialog
  ) {}

  openTaskCard() {
    const dialogRef = this.dialog.open(TaskCardDetailviewComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
