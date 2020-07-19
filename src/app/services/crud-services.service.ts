import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap, takeUntil} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {IServer} from '../common/server';

@Injectable({
  providedIn: 'root'
})
export class CrudServices {

  constructor(private http: HttpClient) { }

  getServers() {
    return this.http.get<Array<IServer>>(environment.apiEndpoint+'servers')
    .pipe(
      tap(elem => {
        
        //FOR DEBUGGING PURPOSES
        //console.log('From get all')
        //console.log(elem);
        
      })
    )
  }

  getServer(id:number) {
    return this.http.get(environment.apiEndpoint+'servers/'+id);
  }

  enableServer(id:number) {
    return this.http.put(environment.apiEndpoint+'servers/'+id+'/on',{});
  
  }

  disableServer(id:number) {
    return this.http.put(environment.apiEndpoint+'servers/'+id+'/off',{}); 
  }

  rebootServer(id:number) {
    return this.http.put(environment.apiEndpoint+'servers/'+id+'/reboot',{});   
  }

}
