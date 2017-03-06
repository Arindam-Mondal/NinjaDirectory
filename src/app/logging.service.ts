import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  log(componentName){
    console.log("In Logging Service: "+componentName);
  }

}
