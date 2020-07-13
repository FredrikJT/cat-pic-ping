import { Component, OnInit } from '@angular/core';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {GetCatService} from './get-cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private showCat = false;
  public catBlob;
  public catUrl;
  public reader = new FileReader();
  public base64data;
  public picUrl;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private getCatService: GetCatService){}

  public ngOnInit() {
      }

  public showCatPic() {
    this.showCat = true;
    this.getCatService.getCatBlob().subscribe(
      blob => this.catBlob = blob
    );
    this.catUrl = URL.createObjectURL(this.catBlob);
    console.log(this.catUrl);

    console.log(this.catBlob);


    // this.catUrl = this.sanitizer.bypassSecurityTrustUrl this.reader.result;
    // this.reader.onloadend(this.reader.result)
    // console.log(this.catBlob);
    // this.catUrl = URL.createObjectURL(this.catBlob);

    // if (this.catUrl) {
    //   console.log('cat available')
    // }
  }

  public get shouldShowCat() {
    return this.showCat;
  }


  public onClick() {
    this.picUrl = '';
    console.log('settingurl');
    this.picUrl = 'https://cataas.com/cat';
  }
}
