import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {GetCatService} from './get-cat.service';
import { initializeApp } from 'firebase/app';
import {getDatabase, ref, set} from 'firebase/database';
import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css'
import { CreateAccessTokenService } from './services/create-access-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public catBlob;
  public catUrl$: Observable<SafeUrl>;
  public catUrl;
  public dangerousUrl: string;
  public subscription$;
  private firebaseConfig = {
    apiKey: "AIzaSyCcwHpM8x2zLqetkDTaqmLEt7wvqmVawhk",
    authDomain: "cat-pic-ping.firebaseapp.com",
    databaseURL: "https://cat-pic-ping.firebaseio.com",
    projectId: "cat-pic-ping",
    storageBucket: "cat-pic-ping.appspot.com",
    messagingSenderId: "1046081763497",
    appId: "1:1046081763497:web:c963d08cc223b6ba8bd1b8",
    measurementId: "G-ZTF6X6KTX9"
  };

  constructor(
    private sanitizer: DomSanitizer,
    private getCatService: GetCatService,
    private createAccessTokenService: CreateAccessTokenService) {}

  public ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig);

    // Get a reference to the database service
    const database = getDatabase(app);


  }

  //https://firebase.google.com/docs/database/web/read-and-write

  writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

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
