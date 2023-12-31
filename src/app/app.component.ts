import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  products: any[] = [];
  jsonObj = {
    key: 'value',
  };

  constructor(private _af: AngularFireDatabase) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.subscription = this._af
      .list('/products')
      .valueChanges()
      .subscribe((resp : any) => {
        if(!resp) return;
        this.products = resp;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
