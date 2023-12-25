import { Component } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  displayName! : string;

  constructor(private _router: Router) {}
  
  signOut() {
    const auth = getAuth();
    signOut(auth).then(()=>{
      localStorage.clear();
      this._router.navigate(['/']); 
    });
  }
}
