import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CrudServices } from '../services/crud-services.service';
import { Observable, interval } from 'rxjs';
import {IServer} from '../common/server';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.scss']
})
export class ServerListComponent implements OnInit {

  serverList$:Observable<Array<IServer>>;
  _filterBy: string = null;
  servNum: number;

  get filterBy() {
    return this._filterBy;
  }

  @Input() set filterBy(value) {
    this._filterBy = value;
    this.serverList$ = this.filterBy ? this.performFilter(this.filterBy) : this.CrudServices.getServers();
  }
 
  @Output() eventGetNumber: EventEmitter<number> = new EventEmitter();

  sendUp(serverCount:number) {
    console.log('sending');
    this.eventGetNumber.emit(serverCount);
  }

  constructor(private CrudServices: CrudServices) {
   }


  availabilityColor(status) {
    switch(status) {
      case 'ONLINE': {return 'aqua'}
      case 'OFFLINE': {return 'text-normal'}
      case 'REBOOTING': {return 'text-muted'}
    }
  }

  enableServer(id:number) {
    this.CrudServices.enableServer(id)
    .subscribe( response => {
      console.log(`Succesfully enabled server ${id}`);
      this.serverList$ = this.CrudServices.getServers();
    },
    error => {
      console.log(error.error.errorMessage);
    });
  }

  disableServer(id:number) {
    this.CrudServices.disableServer(id)
    .subscribe( response => {
      console.log(`Succesfully disabled server ${id}`);
      this.serverList$ = this.CrudServices.getServers();
    },
    error => {
      console.log(error.error.errorMessage);
    })
  }

  rebootServer(id:number) {
    this.CrudServices.rebootServer(id)
    .subscribe(response => {
      console.log(`Rebooting server ${id}`);
      this.serverList$ = this.CrudServices.getServers();
    },
    error => {
      console.log(error.error.errorMessage); //dlużej się nie dało?
    }
    );
    const timer = interval(500)
    .subscribe(
      tick => {
        this.CrudServices.getServer(id)
        .subscribe( data => {
          if(data['status']!=='REBOOTING')
          {
            timer.unsubscribe();
            this.serverList$ = this.CrudServices.getServers();
          }
        })
      }
    )
  }

  performFilter(filterExp) {
    this.serverList$ = this.CrudServices.getServers();
    return this.serverList$.pipe(
      //map fires too many times - resolved
      map((listed) => {
        return listed.filter(
          element => {
            return element['name'].toLocaleLowerCase().indexOf(filterExp.toLocaleLowerCase()) !== -1;
          }
        )
      })
    )
  }

  ngOnInit() {
    this.serverList$ = this.CrudServices.getServers();
  }
  //on destroy niepotrzebny bo używam async pipe
}
