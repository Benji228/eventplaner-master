import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../shared/model/task.model";
import {MatDialog} from '@angular/material/dialog';
import { TaskCardDetailviewComponent } from '../task-card-detailview/task-card-detailview.component';
import {ParticipantService} from "../shared/services/participant.service";
import {Participant} from "../shared/model/participant.model";

@Component({
  selector: 'app-new-task-card',
  templateUrl: './new-task-card.component.html',
  styleUrls: ['./new-task-card.component.css']
})
export class NewTaskCardComponent implements OnInit{

  @Input() task!: Task;
  filteredParticipants: Participant[];


  constructor(
    private dialog: MatDialog,
    private participantService: ParticipantService
  ) {}

  ngOnInit(): void {
    this.participantService.getParticipants().subscribe({
      next: value => {
        this.filteredParticipants = value.filter(participant => {
          return this.task.participants.includes(participant.id);
        });
        console.log(this.filteredParticipants)
      }
    })
  }

  openTaskCard() {
    const dialogRef = this.dialog.open(TaskCardDetailviewComponent, {
      data: {
        task: this.task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
