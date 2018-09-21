import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EndPoint } from '../../apiUrl';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }
  jobs() {
    return this.http.get<any>(EndPoint.HOST_URL + 'jobs').pipe(map(data => {
      return data;
       }
     ));
  }
}
