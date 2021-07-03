import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { AppRouting } from './appRouting.routing'
import { AppComponent } from './AppRoot/app.component';
import { HomeComponent } from './HomeComponent/home.component';
import { FooterComponent } from './Footer/footer.component';
import { AllQuestionComponent } from './allQuestions/allquestions.component';
import { AddQuestionComponent } from './add-question/add-question.component'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireModule } from '@angular/fire'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { environment } from '../environments/environment';
import { QuestionComponent } from './question/question.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { EventComponent } from './event/event.component';
import { ScoreComponent } from './score/score.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    AllQuestionComponent,
    AddQuestionComponent,
    QuestionComponent,
    ResultPageComponent,
    EventComponent,
    ScoreComponent,
    FeedbacksComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 8,
      innerStrokeWidth: 4,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      backgroundStroke: "#C7E596"
      
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
