import { Component, Input, OnInit } from '@angular/core';
import { AnsweredData } from '../Services/all.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor() { }
  @Input() friends!:AnsweredData[]

  ngOnInit(): void {
  }

}
