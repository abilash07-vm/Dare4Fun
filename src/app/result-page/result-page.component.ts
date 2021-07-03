import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { AllServices, AnsweredData, QuestionEvent,User } from '../Services/all.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {

  constructor(private allServices:AllServices,private activatedRoute:ActivatedRoute) { }

  isCopied=false
  currentUserScore!:AnsweredData
  scoreDetails:AnsweredData[]=[]
  currentuser!:User
  eventid!:String
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let id=paramMap.get('eventid'),userid=paramMap.get('userid');
      if(userid!=null){
        this.allServices.getUserById(userid).subscribe((data:any)=>{
            this.currentuser=data
        })
      }
      if(id!=null){
        this.eventid=id;
      }
      this.allServices.getEventById(id).subscribe((data:any)=>{
          let eventDetails:QuestionEvent=data;
          this.scoreDetails=eventDetails["friendsperformance"];
          this.scoreDetails.forEach((data)=>{
            if(data["userid"]==userid){
              this.currentUserScore=data;
            }
          })
      })
    })
  }

  onCopy(){
    let val=`How well do you know about ${this.currentuser["username"]} \n\n ${window.location.origin}/participate/${this.eventid} `
    this.isCopied=true;
    const selBox = document.createElement('textarea');
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    document.documentElement.scrollTop = 0;
  }
}
