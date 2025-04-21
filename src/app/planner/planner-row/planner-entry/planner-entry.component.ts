import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PlannerService, ScheduleEntry, ScheduleSection } from 'src/app/planner.service';

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
    setTimeout(()=>this.updateElement(), 500);
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["container"] != null){
      this.updateElement();
    }
  }

  updateElement(){
    if(this.container != null && this.element != null){
      this.element.nativeElement.style.height = this.entry.dayTask ? "5%" : this.container.offsetHeight+"px";
      let widthPercent =  PlannerService.getPercentLength(this.entry.start, this.entry.end, PlannerService.getLength(this.parent.start, this.parent.end));
      this.element.nativeElement.style.width = (widthPercent*100.0)+"%";
      this.element.nativeElement.style.left = (PlannerService.getPercentOnLength(this.parent.start, this.parent.end, this.entry.start)*100.0)+"%";
    }
  }

}
