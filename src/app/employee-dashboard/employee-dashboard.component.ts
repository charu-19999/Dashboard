import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model.ts';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  fromValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  constructor(private frombulider: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.fromValue = this.frombulider.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    });
    this.getAllEmployee();
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.fromValue.value.firstName;
    this.employeeModelObj.lastName = this.fromValue.value.lastName;
    this.employeeModelObj.email = this.fromValue.value.email;
    this.employeeModelObj.mobile = this.fromValue.value.mobile;
    this.employeeModelObj.salary = this.fromValue.value.salary;

    this.api.postEmploye(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee Added successfuly');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.fromValue.reset();
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
  getAllEmployee() {
    this.api.getEmploye().subscribe((res) => {
      this.employeeData = res;
    });
  }
}
