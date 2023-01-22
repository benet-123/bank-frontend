  import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 user:any
  acno: any;

  // system date and time
  sdate:any

  constructor( private ds:DataService,private router:Router,private dash:FormBuilder ) { 
    this.user=this.ds.currentusers
    this.sdate=new Date
  }
  
  ngOnInit(): void {
    // if(!localStorage.getItem('currentuser')){
    //   alert('Please login first')
    //   this.router.navigateByUrl('')
    // }
    this.user=JSON.parse(localStorage.getItem('currentuser') || '')
    

  }
dashboard1=this.dash.group({account1:['',[Validators.required,Validators.pattern('[0-9]+')]],password1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z\*@]+')]],amount1:['',[Validators.required,Validators.pattern('[0-9\,]+')]]})
dashboard2=this.dash.group({account2:['',[Validators.required,Validators.pattern('[0-9]+')]],password2:['',[Validators.required,Validators.pattern('[a-zA-Z0-9\@*]+')]],amount2:['',[Validators.required,Validators.pattern('[0-9\,]+')]]})


deposit(){
var acno=this.dashboard1.value.account1
var psw=this.dashboard1.value.password1
var amnt=this.dashboard1.value.amount1

if(this.dashboard1.valid){
  const result=this.ds.deposit(acno,psw,amnt)

  if(result){
    alert(`${amnt} is credited in your account and the available balance is ${result}`)
  }
  
    }
  
}
  withdraw(){
 var acno1=this.dashboard2.value.account2
 var psw1=this.dashboard2.value.password2
 var amnt1=this.dashboard2.value.amount2
if(this.dashboard2.valid){
  const result=this.ds.withdraw(acno1,psw1,amnt1)

  if(result){
    alert(`${amnt1} is debited from your account, available balance is ${result}`)
  }
  
}

  }
  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentaccountno')
    this.router.navigateByUrl('')
  }
  delete(){
    this.acno=JSON.parse(localStorage.getItem('currentaccountno') || '')
  }
  onCancel(){
    this.acno=""
  }
}
