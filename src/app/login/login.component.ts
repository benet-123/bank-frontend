import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetails: any = {
    1000: { acno: 1000, username: "Benet", password: 123, balance: 0 },
    1001: { acno: 1001, username: "Arjun", password: 456, balance: 0 },
    1002: { acno: 1002, username: "Benny", password: 789, balance: 0 },
    1003: { acno: 1003, username: "Shiva", password: 111, balance: 0 },

  }
  aim = "Your Perfect Banking Partner"
  data = "Enter your Account Number"
  data1 = "Enter your Password"
  acno: any
  psw: any
  constructor(private router: Router, private ds: DataService,private formbuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  loginform=this.formbuilder.group({accountnumber:['',[Validators.required,Validators.pattern('[0-9]+')]],password:['',[Validators.required,Validators.pattern('[0-9a-zA-Z\@*]+')]]})

  login() {
    var acno = this.loginform.value.accountnumber
    var psw = this.loginform.value.password
if(this.loginform.valid){
 this.ds.login(acno,psw)
 .subscribe((result:any)=>{
  localStorage.setItem('currentuser',JSON.stringify(result.currentusers));
  localStorage.setItem('currentacno',JSON.stringify(result.currentacno));
  localStorage.setItem('token',JSON.stringify(result.token));

alert(result.message);
this.router.navigateByUrl('dasboard')
 },
 result=>{
  alert(result.error.message)
 }
 )
}


}

}