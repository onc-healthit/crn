import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  userDetials: any;
  Questions: any = [];
  linkedQuestions: any = [];
  selectedQuestionId: any;
  finallinkQuestions: any;
  selectedAnswer: any;
  answerArray: any = [];
  answerObject: any;
  increment: any = 0;
  linkedQAnswers: any = [];
  totalLinkedQuestions: any = [];
  responseObj: any;

  constructor() { 

     //console.log(this.totalLinkedQuestions)

  }
}
