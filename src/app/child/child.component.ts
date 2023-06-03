import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() id : any;
  @Input() name: string = '';
  @Input() money: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    
  }

  getMoney(): void {
    this.money += 5;
    this.dataService.updateMoneyById(this.id, 5);
  }

  receiveMoney(amount: number): void {
    this.money += amount;
  }

  tellChild(): void {
    this.money -= 10;
  }

}
