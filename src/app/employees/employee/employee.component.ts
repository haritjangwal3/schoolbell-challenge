import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeListComponent } from '../employee-list/employee-list.component'
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

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

  onSubmit(form: NgForm) {
    if(form.value.id == null){
      this.insertRecord(form)
    }
    else {
      this.updateRecord(form);
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
    this.service.updateEmployee(form.value).subscribe(res => {
      this.toaster.info('Updated Successfully', 'SchoolBell')
      this.resetForm(form);
      this.service.refreshService();
    })
  }
  
}
