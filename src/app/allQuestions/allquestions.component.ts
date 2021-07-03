import { Component, OnInit } from '@angular/core';
import { AllServices, ChoosenQuestion, Question ,QuestionEvent, User} from '../Services/all.service';
import { Router,ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-question',
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllQuestionComponent implements OnInit {
  userid!: string;
  currUser: User={
    "userid":"",
    "username":"",
    "useremailid":""
  };
  constructor(public allService:AllServices, private router:Router,private activatedRoute:ActivatedRoute) { }

  allquestions : Question[]=[]
  choosenQuestions:ChoosenQuestion[]=[]


  ngOnInit(): void {
    this.choosenQuestions=this.allService.getChossenQuestion()
    
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let userid=paramMap.get('userid');
      if(userid!=null){
        this.userid=userid
        this.allService.getUserById(this.userid).subscribe((d:any)=>{
          this.currUser=d;
          this.allService.getDefaultQuestions(userid).subscribe((questions:any)=>{
            this.allquestions=questions;
            this.allquestions.sort((a,b)=>{
              let fa = a.type.toLowerCase(),
              fb = b.type.toLowerCase();

              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
            });
          })
        });
      }
    });
  }
  onAddQuestion(){
    this.router.navigate(['/','addquestion',this.userid]);
  }

  isValid(){
    return this.choosenQuestions.length<10;
  }

  onSubmit(){
    this.allService.getid().subscribe((id:any)=>{
      let data:QuestionEvent={
        "date":new Date(),
        "userid":this.userid,
        "friendsperformance":[],
        "name": this.currUser["username"],
        "numberofquestion":this.choosenQuestions.length,
        "questionschoosen":this.choosenQuestions,
        "eventid":id["id"],
        "url": window.location.origin
      }
      this.allService.createEvent(data).subscribe((incommingdata)=>{
        this.router.navigate(['/','result',id["id"],this.userid])
      });
      
    });
  }

}
