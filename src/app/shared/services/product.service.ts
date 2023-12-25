import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) {}

  getAllProducts() {
   const listRef: AngularFireList<any> = this._db.list("/products");
    return listRef.valueChanges();
  }

  getItemFromListById(itemId: string): Observable<any> {
    const itemRef: AngularFireObject<any> = this._db.object(`/products/${itemId}`);
    return itemRef.valueChanges();
  }

  saveProduct(product: any) {
    const listRef: AngularFireList<any> = this._db.list("/products");
    return listRef.set(product.id.toString(), product);
  }
  getProduct(product: any) {
    return this._db.object(`/products/${product.id}`);
  }

  updateProduct(itemId: any, newData: any): Promise<void> {
    const itemRef: AngularFireObject<any> = this._db.object(`/products/${itemId}`);
    return itemRef.update(newData);
  }

  deleteProduct(itemId: number): Promise<void> {
    const itemRef: AngularFireObject<any> = this._db.object(`/products/${itemId}`);
    return itemRef.remove();
  }
}
