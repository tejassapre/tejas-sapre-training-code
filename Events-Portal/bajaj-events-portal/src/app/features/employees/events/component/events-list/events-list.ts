import { Component,inject,OnInit } from '@angular/core';
import {Subscription} from "rxjs"
import { Event } from '../../model/event';
import { EventDetails } from '../event-details/event-details';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { DateGlobalizationPipe } from '../../../../../shared/pipes/date-globalization-pipe';
import { LowercaseTruncPipe } from '../../../../../shared/pipes/lowercase-truncate-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { EventsApi } from '../../service/events-api';
import { RouterLink } from "@angular/router";//

@Component({
  selector: 'app-events-list',
  imports: [
    LowercaseTruncPipe,
    DateGlobalizationPipe,
    CommonModule,
    FormsModule,
    /*EventDetails,*/
    NgxPaginationModule,
    RouterLink
],
  templateUrl: './events-list.html',
  styleUrl: './events-list.css',
})
export class EventsList implements OnInit {
  private _eventServiceSubscription:Subscription;
    protected role:string|null;

  ngOnInit(): void {
    this.role=localStorage.getItem('role');

    if(this.role === 'Employee'){
      this.columns = this.columns.filter(col=>col !=="Cancel Event");
    }

    this._eventServiceSubscription=this.eventsApi.getAllEvents().subscribe({
      next:eventsData=>{
        console.log(eventsData);
        this.events=eventsData;
        this.filteredEvents=[...this.events]; 

      },

      error:err => {
        console.log(err);
      }
    })
       
     }


  

  private eventsApi = inject(EventsApi);//
  protected title: string = 'Welcome to Bajaj Finserv Events List!';
  protected subTitle: string = 'Published by Bajaj Finserv HR Department!';
  protected columns: string[] = ['Event Code', 'Event Name ', 'Start Date', 'Fees', 'Show Details','cancel event'];

  protected events: Event[] =[];
  protected childSubTitle: string = 'Details of Selected Events!!!';
  protected searchChars: string = '';
  protected filteredEvents: Event[];
  // protected selectedEvent: Event;
    // protected selectedEventId: number;

  protected childMessage: string;
  protected pageNumber: number = 1;
  protected pageSize: number = 2;
  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }
  // protected onEventSelection(id:number): void {
  //   // console.log(event);
  //   this.selectedEventId = id;
  // }

  private lastPageBeforeSearch: number = 1;
  protected searchEvents(): void {
    if (!this.searchChars || this.searchChars.trim() === '') {
      this.filteredEvents = this.events;
      this.pageNumber = this.lastPageBeforeSearch; // Optionally restore last search page
    } else {
      if (this.filteredEvents === this.events) {
        this.lastPageBeforeSearch = this.pageNumber; // Save current page before filtering
      }
      this.filteredEvents = this.events.filter((event) =>
        event.eventName.toLowerCase().includes(this.searchChars.toLowerCase())
      );
      this.pageNumber = 1; // Reset page to first since filtered result size can shrink
    }
  }

  protected sortDirection: 'asc' | 'desc' = 'asc';

protected sortByEventCode(): void {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.filteredEvents.sort((a, b) => {
    const comparison = a.eventCode.localeCompare(b.eventCode);
    return this.sortDirection === 'asc' ? comparison : -comparison;
  });
}

  ngOnDestroy():void{
    if(this._eventServiceSubscription){
      this._eventServiceSubscription.unsubscribe();
    }
  }
}
