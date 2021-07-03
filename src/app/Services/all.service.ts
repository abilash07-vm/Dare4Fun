import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const baseurl=environment.baseurl;

export interface User{
    userid: String,
    username: String,
    useremailid: String
}

export interface Question{
    questionid:String,
    question:String,
    numberofanswer:number,
    options:String[],
    type:String,
    optiontype:String,
    userid:String,
}

export interface ChoosenQuestion{
    questionid: String,
    correctoption: number
}


export interface QuestionEvent{
    eventid:String,
    name:String,
    userid:String,
    date:Date,
    questionschoosen:ChoosenQuestion[],
    numberofquestion:number,
    friendsperformance: AnsweredData[],
    url?:String
}

export interface AnsweredData{
    userid:String,
    name:String,
    score:number
}
export interface Feedback{
    name: String,
    feedback: String
}

@Injectable({
    providedIn: 'root'
})
export class AllServices{
    constructor(private http:HttpClient){}
    choosenQuestions:ChoosenQuestion[]=[]
    deno="10"
    allQuestion:Question[]=[]
    currentUser!:User

    getid(){
        return this.http.get(baseurl+'randomid');
    }

    // User Backend
    createQuiz(user: any){
        this.currentUser=user;
        return this.http.post(baseurl+'addUser',user);
    }

    getUserById(id:String){
        return this.http.get(`${baseurl}getUser/${id}`);
    }


    // question Backend
    createNewQuestion(question:Question){
        return this.http.post(baseurl+'newQuestion',question);
    }
    getQuestionByid(id:any){
        return this.http.get(baseurl+`getQuestion/${id}`);
    }
    getDefaultQuestions(id:any){
        return this.http.get(baseurl+'getAllQuestions/'+id);
    }

    
    // Question Chossen
    addChossenQuestion(question:ChoosenQuestion){
        let ind=this.choosenQuestions.indexOf(question)
        if(ind>=0){
            this.choosenQuestions[ind]=question;
        }
        else
        this.choosenQuestions.push(question);
        if(this.choosenQuestions.length>=10){
            this.deno="∞"
        }else{
        this.deno="10"
        }      
    }
    deleteChossenQuestion(question:ChoosenQuestion){
        let ind=this.choosenQuestions.indexOf(question)
        if(ind>=0)
        this.choosenQuestions.splice(ind,1);
        if(this.choosenQuestions.length>10){
            this.deno="∞"
        }else{
        this.deno="10"
        }      
    }
    getChossenQuestion(){
        return this.choosenQuestions
    }
    getChossenQuestionById(id:String){
        for(let i=0;i<this.choosenQuestions.length;i++){
            if(this.choosenQuestions[i]["questionid"]==id){
                return this.choosenQuestions[i];
            }
        }
        return false
    }


    // Event Backend
    createEvent(data:QuestionEvent){
        return this.http.post(baseurl+"createevent",data);
    }
    getEventById(id:any){
        return this.http.get(baseurl+`getevent/${id}`);
    }

    // FriendsScore Backend
    addFriendsScore(data:AnsweredData,eventid:String){
        return this.http.post(`${baseurl}addfriendsperformance/${eventid}`,data);
    }
    

     // Feedback Backend
     getAllFeedbacks(){
         return this.http.get(baseurl+"feedbacks");
     }
     addFeedback(data:Feedback){
         return this.http.post(baseurl+"feedbacks",data);
     }
    
}