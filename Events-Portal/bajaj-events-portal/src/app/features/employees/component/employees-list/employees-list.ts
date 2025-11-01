import { Component,inject, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeDetails } from '../employee-details/employee-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import {EmployeesApi} from "../../service/employees-api"

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule, EmployeeDetails, FormsModule, NgxPaginationModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {
    private _employeeServiceSubscription:Subscription;
  
  ngOnInit(): void {
    this._employeeServiceSubscription=this.employeesApi.getAllEvents().subscribe({
      next:employeesData=>{
        console.log(employeesData);
        this.employees=employeesData;
        this.filteredEmployees=[...this.employees]; 

      },

      error:err => {
        console.log(err);
      }
    })
  }

  private employeesApi = inject(EmployeesApi);
  protected title: string = 'Welcome to Bajaj Finserv Employees List';
  protected subTitle: string = 'Published by Bajaj Finserv HR Peoples Department';
  protected childSubTitle: string = 'Details of Selected Employee!!!';

  protected columns: string[] = [
    'Employee Name',
    'City ',
    'Contact Number',
    'Email',
    'Show Details',
  ];

  
  protected employees: Employee[] = [];
  // protected selectedEvent: Employee;
    protected selectedEmployeeId: number;

  protected childMessage: string;
  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }
  public onEmployeeSelection(id:number): void {
    // console.log(event);
    this.selectedEmployeeId = id;
  }
  protected pageNumber: number = 1;
  protected pageSize: number = 1;
  protected searchChars: string = '';
  protected filteredEmployees: Employee[];
 

  protected lastPageBeforeSearch: number = 1;
  protected searchEvents(): void {
    if (!this.searchChars || this.searchChars.trim() === '') {
      this.filteredEmployees = this.employees;
      this.pageNumber = this.lastPageBeforeSearch; // Optionally restore last search page
    } else {
      if (this.filteredEmployees === this.employees) {
        this.lastPageBeforeSearch = this.pageNumber; // Save current page before filtering
      }
      this.filteredEmployees = this.employees.filter((event) =>
        event.employeeName.toLowerCase().includes(this.searchChars.toLowerCase())
      );
      this.pageNumber = 1; // Reset page to first since filtered result size can shrink
    }
  }


   protected sortDirection: 'asc' | 'desc' = 'asc';

protected sortByEventCode(): void {
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  this.filteredEmployees.sort((a, b) => {
    const comparison = a.employeeName.localeCompare(b.employeeName);
    return this.sortDirection === 'asc' ? comparison : -comparison;
  });
}

 ngOnDestroy():void{
    if(this._employeeServiceSubscription){
      this._employeeServiceSubscription.unsubscribe();
    }
  }
}
