import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import Swal from 'sweetalert2';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
    showsideBar:boolean=true
    employeeCount:number=0
    
    selected: Date | null= new Date()
    
    Highcharts: typeof Highcharts = Highcharts;
    profileImage:string='./assets/images/user2.png'
    EditAdminStatus:boolean=false

    adminname:any=""

    adminDetails:any={}

    chartOptions = {};
    constructor(private api:AdminapiService){
    this.chartOptions = 
      {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Project Completion Report'
        },
        tooltip: {
            valueSuffix: '%'
        },
        
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        credits:{
          enabled:false
        },
        series: [
            {
                name: 'project',
                colorByPoint: true,
                data: [
                    {
                        name: 'FireFox',
                        y: 55.02
                    },
                    {
                        name: 'Chrome',
                        sliced: true,
                        selected: true,
                        y: 26.71
                    },
                    {
                        name: 'Opera',
                        y: 1.09
                    },
                    {
                        name: 'Edge',
                        y: 15.5
                    },
                    {
                        name: 'Safari',
                        y: 1.68
                    }
                ]
            }
        ]
    }
    
    }
  ngOnInit(): void {
    
    this.totalEmployee()
    
    if(localStorage.getItem("name")){
      this.adminname=localStorage.getItem("name")
    }
    // fetching admin details
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
      
    })
  }
    menuBar(){
      this.showsideBar=!this.showsideBar
    }

    totalEmployee(){
      this.api.allemployyeApi().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.employeeCount=res.length

        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }

    edit(){
      this.EditAdminStatus=true
    }
    getFile(event:any){
      let fileDetail=event.target.files[0]
      console.log(fileDetail);
      // create an object for filereader()class
      let fr=new FileReader()
      //read
      fr.readAsDataURL(fileDetail)
      // convert
      fr.onload=(event:any)=>{
        this.profileImage=(event.target.result)
      }
      
    }
    updateAdmin(){
      this.api.updateAdminApi(this.adminDetails).subscribe({
        next:(res:any)=>{
          console.log(res);
          Swal.fire({
                  icon: "success",
                  title: "wow",
                  text: "Admin Details updated Successfully",
                });
          localStorage.setItem("name",res.name)
          localStorage.setItem("pswd",res.password)
          this.adminname=localStorage.getItem("name")
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    cancel(){
      this.api.authorization().subscribe((res:any)=>{
        console.log(res);
        this.adminDetails=res
        if(res.picture){
          this.profileImage=res.picture
        }
        
      })
      this.EditAdminStatus=false
    }
}
