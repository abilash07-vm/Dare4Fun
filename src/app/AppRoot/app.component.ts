import { Component, OnInit} from '@angular/core';
import { AllServices} from '../Services/all.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private allService:AllServices){}
  ngOnInit(){
  }
  title = 'Dare4fun';
}
