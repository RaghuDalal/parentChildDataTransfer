import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  getDataSubject() {
    return this.dataSubject;
  }

  updateData(data: any[]) {
    this.dataSubject.next(data);
  }

  updateMoneyById(id: number, amount: number) {
    let data = this.dataSubject.getValue();
    let updatedData = data.map(item => {
    if (item.id === id) {
      return {
        ...item,
        money: item.money + amount
      };
    }
    return item;
  });
    this.updateData(updatedData);
  }
}
