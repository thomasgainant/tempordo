import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerEntryComponent } from './planner-entry/planner-entry.component';
import { PlannerService, ScheduleEntry, ScheduleSection } from 'src/app/planner.service';

@Component({
  selector: '[planner-row]',
  templateUrl: './planner-row.component.html',
  styleUrls: ['./planner-row.component.scss'],
  imports: [ CommonModule, PlannerEntryComponent ]
})
export class PlannerRowComponent  implements OnInit {
  @Input() section!:ScheduleSection;

  @ViewChild('rowContainer') rowContainer!: ElementRef;

  public divisions:ScheduleEntry[] = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges){
    if(changes["section"] != null && this.section != null){
      let length = PlannerService.getLength(this.section.start, this.section.end);

      let lengthHour = 1000*60*60;
      let lengthDay = 1000*60*60*24.0;
      let lengthWeek = 1000*60*60*24.0*7.0;

      let divisionLength = lengthHour;
      //This section is a day
      if(length <= lengthDay){
        divisionLength = lengthHour;
      }
      //This section is a week
      else if(length <= lengthWeek){
        divisionLength = lengthDay;
      }
      //This section is a month
      else{
        divisionLength = lengthWeek;
        console.log("month"+Math.round(length/divisionLength))
      }

      for(let i = 0; i < Math.ceil(length/divisionLength); i++){
        this.divisions.push(new ScheduleEntry("",
          new Date(this.section.start.getTime() + (i * divisionLength)),
          new Date(this.section.start.getTime() + ((i+1) * divisionLength))
        ));
      }
    }
  }

}
