import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as go from 'gojs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly rootURL = 'http://localhost:3000/';
  formData : Employee;
  emp_list : Employee[];
  dataSource : any;
  newModel : go.TreeModel;

  constructor(private http : HttpClient) { }

  OnInit(){
    let employees = [];
    this.getEmployees()
    .subscribe(res=>{
      this.emp_list = res;
      this.dataSource = new MatTableDataSource(this.emp_list);
      res.forEach(emp => {
        if(emp.manager_id == 0){
          let objEmp = {'key': emp.id, 'name': emp.name, 'title':emp.department };
        }
        let objEmp = {'key': emp.id, 'name': emp.name, 'title':emp.department, 'parent': emp.manager_id };
        employees.push(objEmp);
      });
      this.newModel = new go.TreeModel(employees);
    });
  }
  
  refreshService(){
    this.OnInit();
  }
  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.rootURL+ 'employees');
  }

  insertEmployee(formData : Employee){
    formData['id'] = 0;
    return this.http.post(this.rootURL+ 'employees', formData, { responseType: 'text' });
  }

  updateEmployee(formData : Employee){
    return this.http.put(this.rootURL+ 'employees', formData, { responseType: 'text' });
  }

  deleteEmployee(id : Number){
    return this.http.delete(this.rootURL+ 'employees/'+ id, { responseType: 'text' });
  }
}
