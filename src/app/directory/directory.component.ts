import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { LoggingService } from '../logging.service';
import { NinjaService } from '../ninja.service';
import { Ninja } from '../ninja'

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [NinjaService]
})
export class DirectoryComponent implements OnInit {
//term:any;
ninjas: Ninja[] = [];
constructor(private ninjaService: NinjaService) { }
  
//logIt(){
//  var componentName  = "Directory Component";
//  this.logger.log(componentName);
//}

  // ninjas = [
  //   {name: "Yoshi", belt: "Black"},
  //   {name: "Ryu", belt: "Red"},
  //   {name: "Crystal", belt: "Purple"}
  // ];

  ngOnInit() {
    console.log("inside ngOnInit");
    this.ninjaService.getAll().subscribe(n => this.ninjas = n);
  }

}
