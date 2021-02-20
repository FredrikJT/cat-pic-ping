import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {GetCatService} from './get-cat.service';
import firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firebaseStore from 'firebase/firestore';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

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

  constructor(private sanitizer: DomSanitizer, private getCatService: GetCatService) {}

  public ngOnInit(): void {
    firebase.initializeApp(this.firebaseConfig);

    //Auth
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          // var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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
