import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm', { static: false }) public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  employee: Employee;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];
  gender = 'male';
  contactPreference = 'email';
  department = '3';
  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        email: null,
        phoneNumber: null,
        contactPreference: null,
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null
      };
      this.createEmployeeForm.reset();
      this.panelTitle = 'Create Employee';
    } else {
      this._employeeService.getEmployee(id).subscribe(
        (employee) => {this.employee = this.employee; },
        (err: any) => console.log(err)
      );
      this.panelTitle = 'Edit Employee';
    }
  }
  saveEmployee(empForm: NgForm): void {
    if (this.employee.id == null) {
      console.log(this.employee);
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          empForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          empForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => { console.log(error); }
      );
    }
  }
}
