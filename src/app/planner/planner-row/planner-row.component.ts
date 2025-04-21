import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerEntryComponent } from './planner-entry/planner-entry.component';
import { ScheduleSection } from 'src/app/planner.service';

@Component({
  selector: '[planner-row]',
  templateUrl: './planner-row.component.html',
  styleUrls: ['./planner-row.component.scss'],
  imports: [ CommonModule, PlannerEntryComponent ]
})
export class PlannerRowComponent  implements OnInit {
  @Input() section!:ScheduleSection;

  @ViewChild('rowContainer') rowContainer!: ElementRef;

  constructor() { }

  ngOnInit() {}

}
