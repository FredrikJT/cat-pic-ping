import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCatService {

  constructor(public http: HttpClient) {}

  public headers = new Headers({
    'Cache-control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    Pragma: 'no-cache',
    Expires: '0'
  });

  // public headerss = new Headers({
  //   'Cache-Control':  'no-cache, no-store, must-revalidate, post-
  //                       check=0, pre-check=0',
  //   'Pragma': 'no-cache',
  //   'Expires': '0'
  // });

  public getCatBlob(): Observable<Blob> {

    return this.http.get('https://cataas.com/cat', {...this.headers, observe: 'body', responseType: 'blob'});
  }
}
