import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerRowComponent } from './planner-row/planner-row.component';
import { PlannerService } from '../planner.service';

@Component({
  selector: 'planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, PlannerRowComponent]
})
export class PlannerComponent  implements OnInit {

  constructor(public plannerService:PlannerService) { }

  ngOnInit() {}

  static getLength(start:Date, end:Date):number{
    return end.getTime() - start.getTime();
  }

  static getPercentLength(start:Date, end:Date, totalLength:number){
    let length = PlannerComponent.getLength(start, end);
    return length/totalLength;
  }

  static getPercentOnLength(start:Date, end:Date, point:Date){
    let length = PlannerComponent.getLength(start, end);
    return (point.getTime()-start.getTime())/length;
  }

}
