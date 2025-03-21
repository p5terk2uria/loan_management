import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private http:HttpClient, private dialog:MatDialog){}
add(){
  this.dialog.open(AddComponent,{
    height:'100vh',
    width:'600px'
  })

}
}
