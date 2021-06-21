import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AllServices, User } from '../Services/all.service'

@Component({
    selector: 'mv-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    isEvent=false
    eventid!:String
    form!:FormGroup
    constructor(private formBuilder: FormBuilder,private allService:AllServices,private router:Router,private activatedRoute:ActivatedRoute){}
    ngOnInit(){
        this.activatedRoute.paramMap.subscribe((paramMap)=>{
            let type=paramMap.get("type");
            if(type==="participate"){
                let eventid=paramMap.get("eventid");
                if(eventid!=null){
                    this.isEvent=true;
                    this.eventid= eventid;
                }
            }
        })

        this.form=this.formBuilder.group({
            username: this.formBuilder.control('',[
                Validators.required,
                Validators.pattern('[a-zA-Z0-9]+')]),
            useremailid: this.formBuilder.control('',[
                Validators.required,
                Validators.email
            ])
        })
    }

    onSubmit(userdetail:User){
        this.allService.getid().subscribe((id:any)=>{
            userdetail["userid"]=id["id"]
            this.allService.currentUser=userdetail;
            this.allService.createQuiz(userdetail).subscribe((data)=>{
                if(this.isEvent){
                    this.router.navigate(["/","event",this.eventid,id["id"]]);
                }else{
                    this.router.navigate(["/","allquestions",id["id"]]);
                }
            })
        })
    }
};