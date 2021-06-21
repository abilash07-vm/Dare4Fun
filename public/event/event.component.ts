import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AllServices, AnsweredData, ChoosenQuestion, Question, QuestionEvent, User } from '../Services/all.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private allServices:AllServices,private activatedRoute:ActivatedRoute,private router:Router) { }
  eventDetails!:QuestionEvent
  index:number=0;
  questions:Question[]=[]
  correctIndexes:Number[]=[]
  numberOfCorrectAnswer=0
  isLoaded=false
  currentUserid!:String
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let eventid=paramMap.get('eventid');
      let userid=paramMap.get('userid');
      if(userid!=null){
        this.currentUserid=userid;
      }
      this.allServices.getEventById(eventid).subscribe((data:any)=>{
        this.eventDetails=data;
        this.eventDetails['questionschoosen'].forEach(element => {
            let choosenQuestion:ChoosenQuestion=element
            this.allServices.getQuestionByid(choosenQuestion['questionid']).subscribe((data:any)=>{
              this.questions.push(data);
              this.correctIndexes.push(choosenQuestion['correctoption'])
              this.isLoaded=true
            })
        });
        
      })
      
    })
    
  }
  
  public correctOption() : Number {
    return this.correctIndexes[this.index];
  }

  
  public getTotalNumberOfquestion() : number {
    return this.eventDetails["numberofquestion"];
  }

  onSelect(iscorrect:boolean){
    if(iscorrect){
      this.numberOfCorrectAnswer+=1
    }
    this.moveNext()
  }
  moveNext(){
    let total:any=this.getTotalNumberOfquestion()
    if(this.index==total-1){
      this.allServices.getUserById(this.currentUserid).subscribe((d:any)=>{
        let user:User=d;
        let score:number=Math.floor(this.numberOfCorrectAnswer/this.getTotalNumberOfquestion()*100)
        let data:AnsweredData={
          "name":user["username"],
          "userid":user["userid"],
          "score":score
        }
        this.allServices.addFriendsScore(data,this.eventDetails["eventid"]).subscribe((data)=>{
          this.router.navigate(['/','result',this.eventDetails["eventid"],this.currentUserid])
        })
      })
      
      
    }else
    this.index+=1;
  }
  

}
