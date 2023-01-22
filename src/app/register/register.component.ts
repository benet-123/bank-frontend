import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ds:DataService,private router:Router,private formbuilder:FormBuilder) { }

  registerform=this.formbuilder.group({uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],acno:['',[Validators.required,Validators.pattern('[0-9]+')]],psw:['',[Validators.required,Validators.pattern('[0-9]+')]]})
  ngOnInit(): void {
  }
  register(){
   var accno=this.registerform.value.acno
   var username=this.registerform.value.uname
   var psw=this.registerform.value.psw

   if(this.registerform.valid){
     this.ds.register(accno,username,psw)
     .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('')
     });


      }

      else{
        alert("invalid form")
      }

}
}