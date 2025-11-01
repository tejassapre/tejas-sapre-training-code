import { Component, OnInit, OnDestroy } from '@angular/core';
import { Input, Output, EventEmitter ,inject} from '@angular/core';
import { Event } from '../../model/event';
import { CommonModule } from '@angular/common';
import{EventsApi} from "../../service/events-api";
import {Subscription} from "rxjs";
import{ActivatedRoute}from"@angular/router";
@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit,OnDestroy{
  private _eventApi=inject(EventsApi);
  private _activatedRoute = inject(ActivatedRoute);
  private _eventsApiSubscription:Subscription;
  protected title: string = 'Details of --';
  // @Input() public eventId: number;
  protected event:Event;
  // @Input() public subTitle: string;
  // @Output() sendConfirmationMessage: EventEmitter<string> = new EventEmitter<string>();
  // protected onEventProcessed(): void {
  //   //this will fire an event to send the data to parent component
  //   this.sendConfirmationMessage.emit(
  //     `Event ${this.event.eventName} has been processed and stored in Oracle DB!`
  //   );
  // }

    ngOnInit(): void {
      let eventId=this._activatedRoute.snapshot.params['id'];
      this._activatedRoute.data.subscribe({
        next:data=>{
          console.log(data);
        }
      });
      this._eventApi.getEventDetails(eventId).subscribe({
        next:data =>{
          this.event = data;
        },error:err=>{
          console.log(err);
        }
      });
    }
  ngOnDestroy(): void {
    if(this._eventsApiSubscription){
      this._eventsApiSubscription.unsubscribe();
    }
  }
}
