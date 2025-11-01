import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesApi {
    private _baseUrl:string="http://192.168.1.17:9090/api";
  private _httpClient=inject(HttpClient);
public getAllEvents():Observable<Employee[]>{
 return this._httpClient.get<Employee[]>(`${this._baseUrl}/employees`);
}

public getEmployeeDetails(employeeId:number):Observable<Employee>{
 return this._httpClient.get<Employee>(`${this._baseUrl}/employees/${employeeId}`);
}

}
