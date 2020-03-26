import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as go from 'gojs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  OnInit(){

    this.getEmployees();
  }
  
  formData : Employee;
  emp_list : Employee[];
  dataSource : any;
  

  readonly rootURL = 'http://localhost:3000/';

  constructor(private http : HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.rootURL+ 'employees');
    // .toPromise().then(res => {
    //   this.emp_list = res as Employee[];
    //   this.dataSource = new MatTableDataSource(this.emp_list);
    //   // this.generateTreeModel(this.emp_list)
    // })
  }

  insertEmployee(formData : Employee){
    formData['id'] = 0;
    return this.http.post(this.rootURL+ 'employees', formData, { responseType: 'text' });
  }

  updateEmployee(formData : Employee){
    return this.http.put(this.rootURL+ 'employees', formData, { responseType: 'text' });
  }

  deleteEmployee(id : Number){
    console.log(this.rootURL+ 'employees/'+ id);
    return this.http.delete(this.rootURL+ 'employees/'+ id, { responseType: 'text' });
  }
}
