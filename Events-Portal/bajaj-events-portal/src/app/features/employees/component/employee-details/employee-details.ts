import { Component, OnChanges, OnDestroy, SimpleChanges,inject } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeesApi } from '../../service/employees-api';
import { Subscription} from "rxjs";

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnChanges,OnDestroy {
  private _employeeApi =inject(EmployeesApi);
    private _employeesApiSubscription:Subscription;
  
  protected title: string = 'Details of --';
  @Input() public employeeId: number;
  protected employee : Employee;
  @Input() public subTitle: string;
  @Output() public sendConfirmationMessage: EventEmitter<string> = new EventEmitter<string>();
  protected onEmployeeProcessed(): void {
    //this will fire an event to send the data to parent component
    this.sendConfirmationMessage.emit(
      `Employee ${this.employee.employeeName} has been processed and stored in Oracle DB!`
    );
  }

ngOnChanges(changes: SimpleChanges): void {
      console.log(changes);
      this._employeeApi.getEmployeeDetails(this.employeeId).subscribe({
        next:data =>{
          this.employee = data;
        },error:err=>{
          console.log(err);
        }
      });
    }
  ngOnDestroy(): void {
    if(this._employeesApiSubscription){
      this._employeesApiSubscription.unsubscribe();
    }
  }
}
