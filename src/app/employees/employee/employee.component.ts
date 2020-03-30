import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service : EmployeeService,
    public toaster : ToastrService ) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.refreshService();
  }

  resetForm(form? : NgForm){
    if(form != null){
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      age : null,
      gender: '',
      department: '',
      manager_id: null,
      salary: null,
      joined: ''
    }
  }

  validateForm(form: NgForm){
    if(form.value.name != '' && form.value.manager_id != ''){
      return true
    }
    this.toaster.warning('Name & Manager ID is required', 'SchoolBell')
    return false
  }

  onSubmit(form: NgForm) {
    if(form.value.id == null){
      if(this.validateForm(form)){
        this.insertRecord(form)
      }
    }
    else {
      if(this.validateForm(form)){
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm){
    this.service.insertEmployee(form.value).subscribe(res => {
      this.toaster.success('Inserted Successfully', 'SchoolBell')
      this.resetForm(form);
      this.service.refreshService();
    })
  }

  updateRecord(form: NgForm){
    let date = new Date(form.value.joined);
    form.value.joined = date.toISOString()
    this.service.updateEmployee(form.value).subscribe(res => {
      console.log(res);
      this.toaster.info('Updated Successfully', 'SchoolBell')
      this.resetForm(form);
      this.service.refreshService();
    })
  }
  
}
