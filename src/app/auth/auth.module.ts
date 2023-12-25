import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    LoginComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ]
})
export class AuthModule { }
