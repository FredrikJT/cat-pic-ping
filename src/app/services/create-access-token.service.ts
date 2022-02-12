import { Injectable, OnInit } from '@angular/core';
import { Auth } from 'googleapis';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateAccessTokenService  implements OnInit{

  jwtClient: Auth.JWT;
  accessToken = new BehaviorSubject<string>('');

  // Load the service account key JSON file.
  serviceAccount = require("../../../service-account.json");

  // Define the required scopes.
  scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/firebase.database"
  ];

  ngOnInit() {

    console.log(`serviceAccount: ${this.serviceAccount}`)
    // Authenticate a JWT client with the service account.
    this.jwtClient = new Auth.JWT(
      this.serviceAccount.client_email,
      null,
      this.serviceAccount.private_key,
      this.scopes
    );

    // Use the JWT client to generate an access token.
    this.jwtClient.authorize(function(error, tokens) {
      if (error) {
        console.log("Error making request to generate access token:", error);
      } else if (tokens.access_token === null) {
        console.log("Provided service account does not have permission to generate access tokens");
      } else {
        this.accessToken.next(tokens.access_token);
  
        // See the "Using the access token" section below for information
        // on how to use the access token to send authenticated requests to
        // the Realtime Database REST API.
      }
    });
  }
}
