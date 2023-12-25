import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UsersService
  ) {}

  get email() {
    return this.signInForm.controls['email'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  ngOnInit(): void {
    this.onSignInFormInit();
  }

  onSignInFormInit(): void {
    this.signInForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignIn(): void {
    console.log('SignInForm : ', this.signInForm);
    console.log('Email :: ', this.email?.errors?.['required']);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((resp) => {
        console.log(resp, ' :: resp');
        if (!resp) return;
        localStorage.setItem('user', JSON.stringify(resp.user));
        // add users data into db
        this._userService.saveUser(resp.user);
        this._router.navigate(['/']);
      })
      .catch((err) => {
        console.log('Error ', err);
      });
  }
}
