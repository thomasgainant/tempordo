import { Injectable, signal, WritableSignal } from '@angular/core';

export class Schedule{
  public currentDay:ScheduleSection;
  public currentWeek:ScheduleSection;
  public nextWeek:ScheduleSection;
  public nextMonth:ScheduleSection;

  constructor(currentDay:ScheduleSection, currentWeek:ScheduleSection, nextWeek:ScheduleSection, nextMonth:ScheduleSection){
    this.currentDay = currentDay;
    this.currentWeek = currentWeek;
    this.nextWeek = nextWeek;
    this.nextMonth = nextMonth;
  }
}

export enum ScheduleSectionType{
  Day,
  Week,
  Month
}

export class ScheduleSection{
  public start:Date;
  public end:Date;

  public type:ScheduleSectionType = ScheduleSectionType.Day;

  public entries:ScheduleEntry[] = [];

  constructor(start:Date, end:Date, entries:ScheduleEntry[]){
    this.start = start;
    this.end = end;
    this.entries = entries;
  }

  public setType(type:ScheduleSectionType){
    this.type = type;
    return this;
  }
}

export class ScheduleEntry{
  public title:string = "";
  public start:Date;
  public end:Date;
  public dayTask:boolean = false;

  constructor(title:string, start:Date, end:Date){
    this.title = title;
    this.start = start;
    this.end = end;
  }

  public setDayTask(dayTask:boolean){
    this.dayTask = dayTask;
    return this;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlannerService {

  public schedule:WritableSignal<Schedule> = signal(new Schedule(
    new ScheduleSection(
      new Date("2025/04/21 00:00:00"),
      new Date("2025/04/21 23:59:59"),
      [
        new ScheduleEntry("RDV notaire", new Date("2025/04/21 15:00:00"), new Date("2025/04/21 15:30:00")),
        new ScheduleEntry("Relevé compteur", new Date("2025/04/21 10:15:00"), new Date("2025/04/21 10:30:00")),
      ]
    ),
    new ScheduleSection(
      new Date("2025/04/22 00:00:00"),
      new Date("2025/04/27 23:59:59"),
      [
        new ScheduleEntry("RDV plombier", new Date("2025/04/22 15:00:00"), new Date("2025/04/22 15:30:00")),
        new ScheduleEntry("Récupérer voiture garage", new Date("2025/04/22 18:00:00"), new Date("2025/04/22 18:00:00")),
        new ScheduleEntry("Diner amis", new Date("2025/04/25 20:00:00"), new Date("2025/04/26 00:00:00")),
      ]
    ).setType(ScheduleSectionType.Week),
    new ScheduleSection(
      new Date("2025/04/28 00:00:00"),
      new Date("2025/05/04 23:59:59"),
      [
        new ScheduleEntry("Déclaration impôts", new Date("2025/04/30 00:00:00"), new Date("2025/04/30 23:59:59")).setDayTask(true),
        new ScheduleEntry("RDV médecin", new Date("2025/04/30 14:30:00"), new Date("2025/04/30 14:45:00")),
      ]
    ).setType(ScheduleSectionType.Week),
    new ScheduleSection(
      new Date("2025/05/05 00:00:00"),
      new Date("2025/06/02 23:59:59"),
      [
        new ScheduleEntry("Anniversaire maman", new Date("2025/05/06 00:00:00"), new Date("2025/05/06 23:59:59")).setDayTask(true)
      ]
    ).setType(ScheduleSectionType.Month)
  ));

  constructor() { }

  static getLength(start:Date, end:Date):number{
    return end.getTime() - start.getTime();
  }

  static getPercentLength(start:Date, end:Date, totalLength:number){
    let length = PlannerService.getLength(start, end);
    return length/totalLength;
  }

  static getPercentOnLength(start:Date, end:Date, point:Date){
    let length = PlannerService.getLength(start, end);
    return (point.getTime()-start.getTime())/length;
  }
}
