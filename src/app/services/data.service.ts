import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentusers:any
  currentacno:any
  // redunctant data

  userDetails: any = {
    1000: { acno: 1000, username: "Benet", password: 123, balance: 0,transaction:[]},
    1001: { acno: 1001, username: "Arjun", password: 456, balance: 0,transaction:[] },
    1002: { acno: 1002, username: "Benny", password: 789, balance: 0,transaction:[] },
    1003: { acno: 1003, username: "Shiva", password: 111, balance: 0,transaction:[] }, 
  }

  constructor(private http:HttpClient) { 
    this.getdata()
  }
  saveData(){  //to save data to the local storage  
    if(this.userDetails){
      localStorage.setItem('database',JSON.stringify(this.userDetails))
    }
    if(this.currentusers){
      localStorage.setItem('currentuser',JSON.stringify(this.currentusers))
    }
    if(this.currentacno){
      localStorage.setItem('currentaccountno',JSON.stringify(this.currentacno))
    }
  }
  
getdata(){
  if(localStorage.getItem('database')){
    this.userDetails=JSON.parse(localStorage.getItem('database') || '')
  }
  if(localStorage.getItem('currentuser')){
    this.currentusers=JSON.parse(localStorage.getItem('currentuser') || '')
  }
  if(localStorage.getItem('currentaccountno')){
    this.currentacno=JSON.parse(localStorage.getItem('currentaccountno') || '')
  }
 


}
  register(acno: any, username: any, password: any) {
    //now we are integrating front end backend

const data={
  acno,
  username,
  password,
}

return this.http.post('http://localhost:3000/register',data) // to connect with the backend
  }
  login(acno: any, psw: any) {
    
const data={
  acno,
  psw,
}

    return this.http.post('http://localhost:3000/login',data) // to connect with the backend


  }

  deposit(acno:any,psw:any,amnt:any){
   var userdetails=this.userDetails
   //to convert amount datatype from string to int
   var amount=parseInt(amnt)
if(acno in userdetails){
  if(psw==userdetails[acno]["password"]){
    userdetails[acno]["balance"]+=amount
    // add deposit details in transaction array, arrayname.push
    userdetails[acno]["transaction"].push({type:'CREDIT',amount})
    this.saveData()

    return userdetails[acno]["balance"]
  }
  else{
    alert("Incorrect password")
    return false
  }
}
else{
  alert("Incorrect User")
  return false
}
  }

withdraw(acno:any,psw:any,amnt:any){
  var userdetails=this.userDetails
  var amount=parseInt(amnt)
  if(acno in userdetails){
if(psw==userdetails[acno]["password"]){
  if(amount<=userdetails[acno]["balance"]){
   userdetails[acno]["balance"]-=amount
  //  add withdraw details  in transactiion array
   userdetails[acno]["transaction"].push({type:"DEBIT",amount})
   this.saveData()

   return userdetails[acno]["balance"]
  }
  else{
    alert("Insufficient balance")
    return false
  }
}
else{
  alert("incorrect password")
  return false
}
  }
  else{
    alert("incorrect user")
    return false
  }
}  
//request to take the user from login
getTransaction(acno:any){
return this.userDetails[acno]["transaction"]
}
}



