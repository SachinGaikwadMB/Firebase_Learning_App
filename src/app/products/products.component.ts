import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  implements OnInit{
  subscription!: Subscription;
  products: any[] = [];

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
