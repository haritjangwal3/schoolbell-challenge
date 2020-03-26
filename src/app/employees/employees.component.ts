import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import * as go from 'gojs';
import { Employee } from '../shared/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class EmployeesComponent implements OnInit {

  constructor(public service : EmployeeService,
  private http: HttpClient) { }
  newModel : go.TreeModel;
  
  ngOnInit(): void {
    let employees = []
    this.service.getEmployees()
    .subscribe(res => {
      res.forEach(emp => {
        if(emp.manager_id == 0){
          console.log(emp);
          let objEmp = {'key': emp.id, 'name': emp.name, 'title':emp.department };
        }
        let objEmp = {'key': emp.id, 'name': emp.name, 'title':emp.department, 'parent': emp.manager_id };
        employees.push(objEmp);
      });

      this.newModel = new go.TreeModel(employees);
      }
    );
  }
}
