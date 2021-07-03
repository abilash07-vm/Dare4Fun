import { Component, OnInit } from '@angular/core';
import { AllServices, Feedback } from '../Services/all.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  constructor(private allServices:AllServices) { }
  feedbacks:Feedback[]=[]
  ngOnInit(): void {
    this.allServices.getAllFeedbacks().subscribe((data:any)=>{
      this.feedbacks=data;
      this.feedbacks.reverse()
    })
  }
  onSubmit(name:String,data:String){
    if(name.length==0){
        alert('name is empty');
        return;
    }else if(data.length==0){
      alert('feedback message is empty');
      return;
    }
    let feedback:Feedback={
      "name": name,
      "feedback":data
    }
    this.feedbacks.unshift(feedback);
    this.allServices.addFeedback(feedback).subscribe();
  }

}
