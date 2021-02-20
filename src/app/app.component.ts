import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {GetCatService} from './get-cat.service';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public catBlob;
  public catUrl$: Observable<SafeUrl>;
  public catUrl;
  public dangerousUrl: string;
  public subscription$;

  constructor(private sanitizer: DomSanitizer, private getCatService: GetCatService) {}

  public showCatPic() {

    this.catUrl$ = this.getCatService.getCatBlob().pipe(
      tap((blob) => console.log('new blob', blob)),
      map(blob => URL.createObjectURL(blob)),
      map(dangerousUrl => this.sanitizer.bypassSecurityTrustUrl(dangerousUrl))
    );
    this.subscription$ = this.catUrl$.subscribe(url => console.log(url));

    this.subscription$.unsubscribe();
  }
}
