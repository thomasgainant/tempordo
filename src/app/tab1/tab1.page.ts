import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { PlannerComponent } from '../planner/planner.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, PlannerComponent],
})
export class Tab1Page {
  constructor() {}
}
