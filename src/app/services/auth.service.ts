import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  islogged(){
    // returns boolean value
    return !!localStorage.getItem("name")
  }
}
