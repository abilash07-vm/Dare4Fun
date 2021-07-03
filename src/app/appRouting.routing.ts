import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './HomeComponent/home.component'
import { AllQuestionComponent } from './allQuestions/allquestions.component'
import { AddQuestionComponent } from './add-question/add-question.component'
import { EventComponent } from './event/event.component'
import { ResultPageComponent } from './result-page/result-page.component'
import { FeedbacksComponent } from './feedbacks/feedbacks.component';

const routes: Routes = [
    { path: '' , pathMatch: 'full',redirectTo: '/new' },
    { path:'feedback',component: FeedbacksComponent },
    { path: 'allquestions/:userid', component:AllQuestionComponent },
    { path:'addquestion/:userid',component:AddQuestionComponent},
    { path:'event/:eventid/:userid' , component: EventComponent},
    { path: 'result/:eventid/:userid', component: ResultPageComponent },
    { path:':type/:eventid', component:HomeComponent },
    { path:':type', component: HomeComponent }
];


export const AppRouting=RouterModule.forRoot(routes);
