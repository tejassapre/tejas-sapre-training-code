import { Routes } from "@angular/router";
import { EmployeesList } from "./component/employees-list/employees-list";
import { EmployeeRegistration } from "./components/employee-registration/employee-registration";

export const employeeRoutes:Routes=[


    {
             path:"",
            component:EmployeesList,
            title:"employeeslist"
        },{
            path: 'register',
            component: EmployeeRegistration
        }



];
