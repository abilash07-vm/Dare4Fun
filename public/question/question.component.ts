import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { AllServices, ChoosenQuestion, Question } from '../Services/all.service';

@Component({
  selector: 'mv-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() replacename!:String
  @Input() question!:Question
  @Input() isEvent:Boolean=false
  @Input() correctIndex!:Number
  @Output() selectedOption=new EventEmitter();

  isTouched=false
  answeredIndex!:number
  choosenQuestion!:ChoosenQuestion
  constructor(private allService:AllServices) { }

  ngOnInit(): void {
    this.choosenQuestion={
      "questionid":this.question.questionid,
      "correctoption": -1
    }
    let data=this.allService.getChossenQuestionById(this.question.questionid)
    if (data){
      this.choosenQuestion=data;
    }
    this.answeredIndex=this.choosenQuestion["correctoption"];
  }

  onSelectAnswer(index:number){
    if(this.isEvent){
        this.isTouched=true
        setTimeout(()=>{
            this.selectedOption.emit(this.correctIndex==index);
            this.isTouched=false
        },1000);
    }else{
        if(index==this.choosenQuestion["correctoption"]){
            this.answeredIndex=-1;
            this.allService.deleteChossenQuestion(this.choosenQuestion);
        }else{
            this.answeredIndex=index;
            this.choosenQuestion["correctoption"]=index;
            this.allService.addChossenQuestion(this.choosenQuestion);
        }
        this.ngOnInit();
    }

  }

  onClear(){
    this.onSelectAnswer(this.answeredIndex);
  }
  replace(str:String){
    return str.replace("%%",this.replacename.toString())
  }


}
