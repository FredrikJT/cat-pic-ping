# cat-pic-ping
Click a button to show a randomly selected cat picture and at the same time notifying another user that a new cat pic is displayed. A simple form of nudging, telling the other user that you exist.

## Storage
Using the Realtime database as suggested by firebase.

### Auth
Generating an accessToken to the storage with the help of a service account.
Authentication towards the service account is made with a private key which is safely stored.


## Develop and deploy
1. `ng build --prod`
2. (`firebase login`)
3. (`firebase init`)
4. `firebase deploy`
