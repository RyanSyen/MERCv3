import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { user } from '@angular/fire/auth';
import * as e from 'cors';
import { FirebaseCRUDService } from '../service/firebasecrudservice';
import { userDetails } from '../domain/userDetails';
import { address } from '../domain/address';

export interface userCredentials {
  userEmail: string,
  userPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: userDetails[] = [
    {
      email: "",
      address: "",
    }

  ]

  address: address[] = [
    {
      address: "",
    }
  ]

  userData: any; // Save logged in user data
  userEmail = "";
  userPassword = "";

  userCred: userCredentials =
    {
      userEmail: "",
      userPassword: ""
    }


  constructor(
    private firebaseService: FirebaseCRUDService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log("saving user data in local storage when logged in" + user.email)
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
        // localStorage.setItem('userCredentials', JSON.stringify(this.userCred));
        // console.log(JSON.parse(localStorage.getItem('userCredentials')!))


        localStorage.setItem('userCredentials', JSON.stringify(this.userCred));
        console.log(JSON.parse(localStorage.getItem('userCredentials')!))

        let test = JSON.parse(localStorage.getItem('user')!);
        console.log(test)
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('userCredentials', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  login(email: string, password: string) {
    // const user = JSON.parse(localStorage.getItem('user')!);
    // console.log(user)
    // alert(user)
    // this.userEmail = email;
    // this.userPassword = password;
    this.userCred.userEmail = email;
    this.userCred.userPassword = password;
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          // this.userCred.userEmail = email;
          // this.userCred.userPassword = password;
          localStorage.setItem('userCredentials', JSON.stringify(this.userCred));
          console.log(JSON.parse(localStorage.getItem('userCredentials')!))

          this.userCred.userEmail = email;
          this.userCred.userPassword = password;

          this.router.navigate(['./home/' + result.user?.uid]);
        });
        // console.log(result.user)
        this.SetUserData(result.user, password);
        this.setUserDetails(this.userCred);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  register(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {


        console.log(this.isLoggedIn);
        // initialization
        let defaultCard =
        {
          id: 0,
          cardNum: "",
          expMonth: "",
          expYear: "",
          CVV: ""
        }


        // this.firebaseService.addAddress(email, "0", this.address[0])
        this.firebaseService.storeUserCard(email, defaultCard);
        this.firebaseService.setUserDetails(email, this.userDetails[0])

        this.firebaseService.setBalance(email, 0);

        this.userCred.userEmail = email;
        this.userCred.userPassword = password;
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        console.log(result.user)
        this.sendEmailForVerification();
        this.SetUserData(result.user);
        this.setUserDetails(this.userCred);
      })
      .catch((error) => {
        console.log("error leh")
        window.alert(error.message);
      });
  }

  // Reset Forggot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, please check your inbox.');
        this.logout();
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Send email verfificaiton when new user sign up
  sendEmailForVerification() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/verify-email']);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {

    let test = JSON.parse(localStorage.getItem('user')!);
    console.log(test)

    let test1 = JSON.parse(localStorage.getItem('userCredentials')!);
    console.log(test1)

    const user = JSON.parse(localStorage.getItem('user')!);


    if (user !== null && user.emailVerified == true) {
      console.log("return true")
      return true;
    } else {
      console.log("return false")
      return false;
    }
    // return user !== null && user.emailVerified !== false ? true : false;
  }

  getCurrentUserData() {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')!);
      // console.log("user: " + user.email)
      return user
    }
  }

  getCurrentUserCredentials() {
    if (this.isLoggedIn) {
      const user1 = JSON.parse(localStorage.getItem('userCredentials')!);
      console.log(user1)
      return user1
    }
  }

  // Sign in with Google
  googleSignIn() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        alert('Welcome back' + user.name); //wont run, need to put at the home page
        setTimeout(() => {
          this.router.navigate(['./user-profile']);
        }, 2000);

      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    localStorage.setItem('userCredentials', JSON.stringify(this.userCred));
    console.log(JSON.parse(localStorage.getItem('userCredentials')!))
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {

          this.router.navigate(['/home/' + result.user?.uid]);
        });
        this.SetUserData(result.user);

      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any, password?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.email}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  setUserDetails(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userData/${user.userEmail}`
    );
    const userData = {
      // uid: user.uid,
      email: user.userEmail,
      password: user.userPassword,
      // displayName: user.displayName,
      // photoURL: user.photoURL,
      // emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // deleteUser(user:any){

  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.email}`
  //   );
  //   return userRef.delete(user);
  // }

  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
