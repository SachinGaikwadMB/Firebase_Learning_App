import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

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
      .then((resp) => {})
      .catch((err) => {
        console.log('Error ', err);
      });
  }
}
