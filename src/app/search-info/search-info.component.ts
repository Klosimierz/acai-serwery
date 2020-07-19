import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent implements OnInit {

  filterString: string;

  constructor() { }

  servCount: number;

  servNum(num:number) {
    this.servCount = num;
  }
 
  ngOnInit() {
  }

}
