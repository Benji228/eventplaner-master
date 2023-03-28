import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {CategoryService} from "../shared/services/category.service";
import {TaskService} from "../shared/services/task.service";
import {Category} from "../shared/model/category.model";
import {ParticipantService} from "../shared/services/participant.service";
import {Participant} from "../shared/model/participant.model";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {forkJoin, map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Task} from "../shared/model/task.model";


@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css'],
})
export class NewTaskDialogComponent implements OnInit{

  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;

  title!: string;
  description!: string;
  dateStart!: string;
  dateEnd!: string;
  subtasks: string[] = [];
  participantsString: string[] = [];



  empForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  categories!: Category[];
  participants!: Participant[];
  filteredParticipants: Observable<string[]>;
  allParticipants: string[] = [];
  participantCtrl = new FormControl('');

  savedTicket: Task;

  subtask = "";


  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: value => {
        console.log(value);
        this.categories = value;
      }
    });


    this.participantService.getParticipants().subscribe({
      next: value => {
        console.log(value)
        this.participants = value;
      },
      complete: () => {
        this.allParticipants = this.participants.map(parti => parti.name);
      }
    });
  }

  constructor(
    private _fb: FormBuilder,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private participantService: ParticipantService
  ) {
    this.empForm = this._fb.group({
      title: '',
      dateStart: '',
      dateEnd: '',
      category: '',
      description: '',
      participants: '',
      subtasks: '',
    });

    this.filteredParticipants = this.participantCtrl.valueChanges.pipe(
      startWith(null),
      map((participant: string | null) => (participant ? this._filter(participant) : this.allParticipants.slice())),
    );
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm);

      this.taskService.postTask(
        this.empForm.get(['title']).value,
        this.empForm.get(['dateStart']).value,
        this.empForm.get(['dateEnd']).value,
        this.empForm.get(['category']).value,
        this.empForm.get(['description']).value,
        this.empForm.get(['participants']).value,
        this.empForm.get(['subtasks']).value,
      ).subscribe({
        next: value => {
          console.log(value);
          this.savedTicket = value;
        },
        complete: () => {
          location.reload();
        }
      });
    }
  }

  remove(participant: string): void {
    const index = this.participantsString.indexOf(participant);

    if (index >= 0) {
      this.participantsString.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.participantsString.push(value);
    }

    event.chipInput!.clear();

    this.participantCtrl.setValue(null);
    this.empForm.setValue({
      'participants': this.participantsString
    })
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.participantsString.push(event.option.viewValue);
    this.participantInput.nativeElement.value = '';
    this.participantCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();


    return this.allParticipants.filter(parti => parti.toLowerCase().includes(filterValue));
  }

  onClickAddSubTask() {
    this.subtasks.push(this.subtask);
    console.log(this.subtasks)
    this.empForm.patchValue({
      'subtasks': this.subtasks
    })
    this.subtask = "";
  }

  onClickRemoveSubTask(index: number) {
    this.subtasks.splice(index,1);

  }

}
