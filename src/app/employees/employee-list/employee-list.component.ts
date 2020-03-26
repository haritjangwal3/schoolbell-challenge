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
  displayedColumns: string[] = ['id', 'name',  'salary', 'manager_id', 'delete'];
  public employees = [];
  public dataSource : any;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public service : EmployeeService,
    public toaster : ToastrService) { }

  ngOnInit(): void {
    this.service.getEmployees()
      .subscribe(res => {
          this.employees = res;
          this.dataSource = new MatTableDataSource(this.employees);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  populateForm(emp : Employee){
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: Number){
    this.service.deleteEmployee(id).subscribe(res => {
      console.log(res);
      this.toaster.warning('Deleted successfully', 'SchoolBell');
      this.service.getEmployees();
    })
  }

  addSorting(){
    this.dataSource.sort = this.sort;
  }
}
