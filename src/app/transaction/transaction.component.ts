import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
useracno:any
transactions:any
  constructor(private ds:DataService) {
this.useracno=this.ds.currentacno
 this.transactions=this.ds.getTransaction(this.useracno)
 
   }

  ngOnInit(): void {
  }

}
