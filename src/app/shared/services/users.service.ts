import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _db: AngularFireDatabase) { }

  saveUser(user : any) {
    this._db.object(`/users/${user.uid}`).update({
      'username' : user.displayName,
      'email' : user.email
    });
  }

  getAllUsers() {
    return this._db.list('/users').valueChanges();
  }
}
