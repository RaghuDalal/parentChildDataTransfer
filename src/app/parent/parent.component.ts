import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { ChildComponent } from '../child/child.component';
import { interval, mergeMap } from 'rxjs';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  dataSubject: any;
  @ViewChildren(ChildComponent) childComponents!: QueryList<ChildComponent>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataSubject = this.dataService.getDataSubject();
    this.dataService.updateData([
      {
        id: 1,
        name: 'Jack',
        money: 10
      },
      {
        id: 2,
        name: 'Jill',
        money: 15
      }
    ]);

    // Automatically send money every minute
    interval(60000) // Emit a value every 60000 milliseconds (1 minute)
      .pipe(
        mergeMap(() => this.childComponents.toArray()) // MergeMap to the childComponents array
      )
      .subscribe(childComponent => {
        this.sendMoneyToChild(5, childComponent);
      });
  }

  sendMoneyToChild(amount: number, childComponent: ChildComponent): void {
    childComponent.receiveMoney(amount);
    this.dataService.updateMoneyById(childComponent.id, amount);
  }

  sendMoney(amount: number, item: any): void {
    item.money += amount;
  }

  tellChild(id: any): void {
    this.childComponents.forEach(childComponent => {
      if (childComponent.id === id) {
        childComponent.tellChild();
      }
    });
    this.dataService.updateMoneyById(id, -10);
  }

}
