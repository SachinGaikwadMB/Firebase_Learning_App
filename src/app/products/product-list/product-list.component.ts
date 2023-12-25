import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  subscription!: Subscription;
  products: any[] = [];
  categories: any[] = [];
  addEditForm!: FormGroup;

  constructor(
    private _db: AngularFireDatabase,
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _router: Router
  ) {}

  get title() {
    return this.addEditForm.controls['title'];
  }
  get id() {
    return this.addEditForm.controls['id'];
  }

  get brand() {
    return this.addEditForm.controls['brand'];
  }

  get category() {
    return this.addEditForm.controls['category'];
  }

  get price() {
    return this.addEditForm.controls['price'];
  }

  get discount() {
    return this.addEditForm.controls['discount'];
  }

  get rating() {
    return this.addEditForm.controls['rating'];
  }

  get stock() {
    return this.addEditForm.controls['stock'];
  }

  get description() {
    return this.addEditForm.controls['description'];
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.initializeAddEditForm();
    this.initialiZeCategories();
  }

  initializeAddEditForm() {
    this.addEditForm = this._fb.group({
      title: ['', Validators.required],
      id: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      discount: [''],
      rating: [''],
      stock: ['', Validators.required],
      description: [''],
    });
  }

  getAllProducts() {
    this.subscription = this._productService
      .getAllProducts()
      .subscribe((resp: any) => {
        if (!resp) return;
        this.products = resp;
        if (this.products.length === 0) {
          alert('No data found !');
          return;
        }
      });
  }

  onSave(value: any) {
    this._productService.saveProduct(value).then((res: any) => {
      this.addEditForm.reset('');
      document.getElementById('closeModel')?.click();
      alert('Product save successfully');
    });
  }

  onEdit(product: any) {
    this._router.navigate(['/products/edit'], {
      queryParams: {
        id: product.id,
        title: product.title,
      },
    });
  }

  onDelete(product: any) {
    if(!confirm('Do you want to delete this product ?')) {
      return;
    }
     this._productService.deleteProduct(product.id).then((res) => {
      alert('Product Deleted Successfully !');
    });
  }

  initialiZeCategories() {
    this._db
      .list('categories')
      .valueChanges()
      .subscribe((res) => {
        if (!res) return;
        this.categories = res;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
