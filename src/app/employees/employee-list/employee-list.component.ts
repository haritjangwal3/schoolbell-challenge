import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','age', 'gender' , 'salary', 'department' , 'manager_name', 'delete'];
  // public employees = [];
  // public dataSource : any;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public service : EmployeeService,
    public toaster : ToastrService) { }

  ngOnInit(): void {
    this.service.refreshService()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource.filter = filterValue.trim().toLowerCase();
  }

  populateForm(emp : Employee){
    const date = new Date(emp.joined);
    emp.joined = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: Number){
    this.service.deleteEmployee(id).subscribe(res => {
      console.log(res);
      this.toaster.warning('Deleted successfully', 'SchoolBell');
      this.ngOnInit()
    })
  }

  addSorting(){
    this.service.dataSource.sort = this.sort;
  }
}
