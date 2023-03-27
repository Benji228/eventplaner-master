import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Participant} from "../model/participant.model";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  public getParticipants() {
    return this.http.get<Participant[]>(environment.baseUrl + "/participant");
  }
}
