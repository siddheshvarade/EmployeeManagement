import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {


  formValue!:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  
  constructor(private formbuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({

      id:[],
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      salary:[''],
    });
    this.getEmployees()

  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName= this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(async(res: any)=>{
      let ref=document.getElementById('cancle')
      ref?.click();
      await  this.formValue.reset();
      alert("Employee Added Successfully"); 
      this.getEmployees();
    },
      err=>{
        console.log(err);
      alert("Something Went Wrong");
    
    })

  }
  getEmployees(){
    this.api.getEmployee().subscribe((res)=>{
       this.employeeData=res;
    },
    err=>{

      console.log(err);  
      })
  } 
  // deleteEmployees(row:any){
  //   this.api.deleteEmployee(row.id).subscribe(res=>{  
  //     console.log(res);
  //     alert('Employee Deleted');
  //     this.getEmployees();
  //   },
  //   err=>{
  //     console.log(err)
  //     alert("Something Went Wrong");
  //   })
    

  // }
  deletedialogMethod(row: any) {
    if(confirm("Are you sure to delete ")) {
      this.api.deleteEmployee(row.id).subscribe(res=>{  
        console.log(res);
        this.getEmployees();
      },
      err=>{
        console.log(err)
        alert("Something Went Wrong");
      })  
    }
    else{

    }
  }
  onedit(row  : any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModelObj.id=row.id
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName= this.formValue.value.firstName;
    this.employeeModelObj.lastName=this.formValue.value.lastName;
    this.employeeModelObj.email=this.formValue.value.email;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.salary=this.formValue.value.salary;
    console.table(this.employeeModelObj);
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      
      alert('Updated Successfully');
      let ref=document.getElementById('cancle')
      ref?.click();
      this.formValue.reset();
      this.getEmployees();

    },
    err=>{
      console.log(err);
    alert("Something Went Wrong");
    })
  }

}


