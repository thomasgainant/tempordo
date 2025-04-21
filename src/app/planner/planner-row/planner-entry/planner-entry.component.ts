import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PlannerService, ScheduleEntry, ScheduleSection } from 'src/app/planner.service';
import { PlannerRowComponent } from '../planner-row.component';

@Component({
  selector: '[planner-entry]',
  templateUrl: './planner-entry.component.html',
  styleUrls: ['./planner-entry.component.scss']
})
export class PlannerEntryComponent  implements OnInit {
  @Input() parent!:ScheduleSection;
  @Input() entry!:ScheduleEntry;
  @Input() container!: HTMLElement;

  constructor(private element: ElementRef) { }

  ngOnInit() {}

  ngAfterViewInit(){
    setTimeout(()=>this.displayElement(PlannerRowComponent.getStart(this.parent), PlannerRowComponent.getEnd(this.parent)), 500);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["container"] != null){
      this.displayElement(PlannerRowComponent.getStart(this.parent), PlannerRowComponent.getEnd(this.parent));
    }
  }

  displayElement(sectionStart:Date, sectionEnd:Date){
    if(this.container != null && this.element != null){
      this.element.nativeElement.style.height = this.entry.dayTask ? "5%" : this.container.offsetHeight+"px";
      let widthPercent =  PlannerService.getPercentLength(this.entry.start, this.entry.end, PlannerService.getLength(sectionStart, sectionEnd));
      this.element.nativeElement.style.width = (widthPercent*100.0)+"%";
      this.element.nativeElement.style.left = (PlannerService.getPercentOnLength(sectionStart, sectionEnd, this.entry.start)*100.0)+"%";
    }
  }
}
