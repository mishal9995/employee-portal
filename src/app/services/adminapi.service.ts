import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

  server_URL='http://employee.io/' 
  //Create an object for behaviour subject
  public shareData=new BehaviorSubject(false)

  updatedata(data:any){
    //to access the new value
    this.shareData.next(data)
  }

  authorization(){
    // admin details
    return this.http.get(`${this.server_URL}/employee/1`)
  }

  addEmployeeApi(employee:employeeModel){
   return this.http.post(`${this.server_URL}/employee`,employee)
  }

  allemployyeApi(){
    return this.http.get(`${this.server_URL}/employee`)
  }

  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.server_URL}/employee/${id}`)
  }

  viewEmployeeApi(id:any){
    return this.http.get(`${this.server_URL}/employee/${id}`)
  }

  updateEmployeeApi(id:any,employee:any){
    return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }

  updateAdminApi(admin:any){
    return this.http.put(`${this.server_URL}/employee/1`,admin)
  }

}
