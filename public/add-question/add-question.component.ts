import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { FormBuilder,FormGroup,FormArray } from '@angular/forms'
import { AngularFireStorage,AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage'
import { AllServices } from '../Services/all.service'


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  form!:FormGroup
  path!:String
  questionid!:String
  ref!:AngularFireStorageReference
  links:String[]=[]
  uploadProgress: number[]=[];
  toggleState='Image'
  errors=''
  userid!: string;

  constructor(private formBuilder:FormBuilder,private fireStorage:AngularFireStorage,private service:AllServices,private router:Router,private activatedRoute:ActivatedRoute) {}


  ngOnInit(): void {
    this.form=new FormGroup({
      question:this.formBuilder.control(''),
      options:this.formBuilder.array([])
    });
    this.onAdd();
    this.onAdd();
    this.service.getid().subscribe((val :any)=>{
      this.questionid=val["id"];
      this.ref=this.fireStorage.ref(`${this.questionid}`);
    })

    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      let userid=paramMap.get('userid');
      if(userid!=null){
        this.userid=userid;
      }
    });
  }

  onGoBack(){
    this.router.navigate(['/','allquestions',this.userid]);
  }

  get options(){
    return this.form.get('options') as FormArray;
  }
  onAdd(){
    let imageForm=new FormGroup({
      image: this.formBuilder.control(''),
      text: this.formBuilder.control('')
    })
    this.uploadProgress.push(-1)
    this.options.push(imageForm); 
    this.links.push('');
  }
  
  uploadImage($event :any,index:any){
    index=parseInt(index.toString());
    let files:File[]=$event.target.files;
    if(files && files[0]){
      let total=index + files.length - this.links.length;
      for(let i=0;i<files.length;i++){
        this.uploadProgress[index+i]=0;
        if(i<total)
        this.onAdd()
      }
      for(let i=0;i<files.length;i++){
        this.ref.child(files[i].name).put(files[i]).then((snapshot:any)=>{
          let linkRef:AngularFireStorageReference=this.ref.child(files[i].name);
          linkRef.getDownloadURL().subscribe((url)=>{
            this.uploadProgress[index+i]=-1;
            this.links[index+i]=url;
          })
        })
      }
    }
    
  }
  
  validImages(){
    let arr:String[]=[];
    this.links.forEach((link:String)=>{
      if(link.trim().length>0){
        arr.push(link);
      }
    })
    return arr;
  }
  
  validText(val:any){
    let arr:String[]=[]
    let options:Array<Object>=val["options"];
    options.forEach((obj:any)=>{
      if(obj["text"].trim().length>0){
        arr.push(obj["text"]);
      }
    })
    return arr;
  }

  toggle(){
    this.toggleState=this.toggleState== 'Image' ? 'Text' : 'Image';
  }

  onSubmit(val:any){
    let question:String=val["question"];
    question=question.trim()
    if(question.length<10){
      this.errors="Question should contain minimum of 10 characters.";
    }else if(question.indexOf("%%")==-1){
      this.errors="Question Should contain %% inorder to replace your name.";
    }else if(this.toggleState==="Image" && this.validImages().length<2){
      this.errors="Alteast 2 Images are required.";
    }else if(this.toggleState==="Text" && this.validText(val).length<2){
      this.errors="Alteast 2 Text are required.";
    }else {
      this.errors="";
      let options=this.toggleState==="Image"? this.validImages():this.validText(val);
      const question={
        "questionid": this.questionid,
        "question": val["question"],
        "options": options,
        "numberofanswer": options.length,
        "type":"created",
        "optiontype":this.toggleState,
        "userid":this.userid
      };
      this.service.createNewQuestion(question).subscribe(()=>{
        this.router.navigate(['/','allquestions',this.userid])
      });
    }
  }


} 
