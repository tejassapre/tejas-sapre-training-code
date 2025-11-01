import { Injectable,inject } from '@angular/core';
import {Event} from '../model/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CudResponse } from '../../../../shared/models/cud-response';
@Injectable({
  providedIn: 'root'
})

export class EventsApi{
  private _baseUrl:string="http://192.168.1.17:9090/api";
  private _httpClient=inject(HttpClient);
public getAllEvents():Observable<Event[]>{
 return this._httpClient.get<Event[]>(`${this._baseUrl}/events`);
}

public getEventDetails(eventId:number):Observable<Event>{
 return this._httpClient.get<Event>(`${this._baseUrl}/events/${eventId}`);
}

public scheduleNewEvent(event:Event):Observable<CudResponse>{
  return this._httpClient.post<CudResponse>(`${this._baseUrl}/events`,event);
}

}

// export class EventsApi {
//   private events:Event[] = [
//     {
//       eventId: 1001,
//       eventCode: 'SEMJQ3',
//       eventName: 'Seminar on jQuery 3.x',
//       description: 'Seminar will discuss all the new features of jQuery 3.x',
//       startDate: new Date(),
//       endDate: new Date(),
//       fees: 800,
//       seatsFilled: 70,
//       logo: 'images/jq.png',
//     },
//     {
//       eventId: 1002,
//       eventCode: 'SEMNG1',
//       eventName: 'Seminar on Angular JS 1.5.x',
//       description: 'Seminar will discuss all the new features of Angular JS 1.5.x',
//       startDate: new Date(),
//       endDate: new Date(),
//       fees: 600,
//       seatsFilled: 50,
//       logo: 'images/ang.png',
//     },
//     {
//       eventId: 1003,
//       eventCode: 'SEMNG2',
//       eventName: 'Seminar on Angular 2.x',
//       description: 'Seminar will discuss all the new features of Angular 2.x',
//       startDate: new Date(),
//       endDate: new Date(),
//       fees: 1000,
//       seatsFilled: 80,
//       logo: 'images/ang.png',
//     },
//     {
//       eventId: 1004,
//       eventCode: 'SEMNG4',
//       eventName: 'Seminar on Angular 4.x',
//       description: 'Seminar will discuss all the new features of Angular 4.x',
//       startDate: new Date(),
//       endDate: new Date(),
//       fees: 1000,
//       seatsFilled: 76,
//       logo: 'images/ng1.png',
//     },
//     {
//       eventId: 1005,
//       eventCode: 'SEMBS3',
//       eventName: 'Seminar on Bootstrap 3.x',
//       description: 'Seminar will discuss all the new features of Bootstrap 3.x',
//       startDate: new Date(),
//       endDate: new Date(),
//       fees: 500,
//       seatsFilled: 34,
//       logo: 'images/bs3.png',
//     },
//   ];

//   public getAllEvents():Event[]{
//     return this.events;
//   }
// }
