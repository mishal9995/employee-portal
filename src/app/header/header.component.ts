import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
logged:boolean=false
  constructor(private router:Router,private api:AdminapiService) {
    api.shareData.subscribe((data:any)=>{
      this.logged=data
    })
  }

  logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('pswd');
    this.router.navigateByUrl('')
    this.logged=false
    
  }
}
