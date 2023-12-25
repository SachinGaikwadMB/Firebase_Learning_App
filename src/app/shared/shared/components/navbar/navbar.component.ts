import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;
  profileUrl! : string;


  constructor(private _router: Router) {}

  ngOnInit(): void {
    let storageUser = localStorage.getItem('user');
    if (storageUser != null || storageUser != undefined) {
      this.user = JSON.parse(storageUser);
      this.profileUrl = this.user.photoURL;
    }
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.clear();
      this._router.navigate(['/login']);
    });
  }
}
