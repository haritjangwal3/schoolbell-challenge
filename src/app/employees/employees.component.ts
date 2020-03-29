import { Component, OnChanges, OnInit, ViewEncapsulation, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
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

  ngOnInit():void{

  }

}
