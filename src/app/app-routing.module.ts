import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee.component';
import { EmployeeDetailsComponent } from './employees/employee-details.component';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';


const routes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },

  {
    path: 'edit/:id',
    component: CreateEmployeeComponent,
  },
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notFound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
