import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Task} from "../model/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getCards() {
    return this.http.get<Task[]>(environment.baseUrl + "/task");
  }

  postTask(title: string,
           dateStart: string,
           dateEnd: string,
           categories: string[],
           description: string,
           participants: string[],
           subtasks: string[]) {
    return this.http.post<Task>(environment.baseUrl + "/task", {
      'taskTitle': title,
      'categories': categories,
      'timeline': {
        'from': dateStart,
        'to': dateEnd
      },
      'taskDescription': description,
      'participants': participants,
      'subtasks': subtasks
    });
  }
}
