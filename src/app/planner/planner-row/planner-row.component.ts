import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerEntryComponent } from './planner-entry/planner-entry.component';
import { PlannerService, ScheduleEntry, ScheduleSection, ScheduleSectionType } from 'src/app/planner.service';

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
      this.displayDivisions(PlannerRowComponent.getStart(this.section));
    }
  }

  displayDivisions(sectionStart:Date){
    let length = PlannerService.getLength(this.section.start, this.section.end);
    let divisionLength = PlannerRowComponent.getDivisionLengthByType(this.section.type);

    for(let i = 0; i < Math.ceil(length/divisionLength); i++){
      this.divisions.push(new ScheduleEntry("",
        new Date(sectionStart.getTime() + (i * divisionLength)),
        new Date(sectionStart.getTime() + ((i+1) * divisionLength))
      ));
    }
  }

  static getFirstEntry(section:ScheduleSection):ScheduleEntry{
    return [...section.entries].sort((a, b)=>{
      return a.start.getTime() - b.start.getTime();
    })[0];
  }

  static getLastEntry(section:ScheduleSection):ScheduleEntry{
    return [...section.entries].sort((a, b)=>{
      return b.end.getTime() - a.end.getTime();
    })[0];
  }

  static getStart(section:ScheduleSection):Date{
    let first = this.getFirstEntry(section);
    let divisionLength = PlannerRowComponent.getDivisionLengthByType(section.type);
    return new Date(first.start.getTime() - divisionLength);
  }

  static getEnd(section:ScheduleSection):Date{
    let last = this.getLastEntry(section);
    let divisionLength = PlannerRowComponent.getDivisionLengthByType(section.type);
    return new Date(last.end.getTime() + divisionLength);
  }

  static getDivisionLengthByType(type:ScheduleSectionType){
    let lengthHour = 1000*60*60;
    let lengthDay = 1000*60*60*24.0;
    let lengthWeek = 1000*60*60*24.0*7.0;

    let divisionLength = lengthHour;
    //This section is a day
    if(type == ScheduleSectionType.Day){
      divisionLength = lengthHour;
    }
    //This section is a week
    else if(type == ScheduleSectionType.Week){
      divisionLength = lengthDay;
    }
    //This section is a month
    else{
      divisionLength = lengthWeek;
    }

    return divisionLength;
  }

}
