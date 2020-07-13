import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCatService {

  constructor(public http: HttpClient) { }

  public getCatBlob() {
    return this.http.get('https://cataas.com/cat', {observe: 'body' ,responseType: 'blob'});
  }
}
