import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productId: any;
  editForm!: FormGroup;
  categories : any[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _db: AngularFireDatabase,
    private _productService :ProductService,
    private _router : Router
  ) {}

  get title() {
    return this.editForm.controls['title'];
  }
  get id() {
    return this.editForm.controls['id'];
  }

  get brand() {
    return this.editForm.controls['brand'];
  }

  get category() {
    return this.editForm.controls['category'];
  }

  get price() {
    return this.editForm.controls['price'];
  }

  get discount() {
    return this.editForm.controls['discount'];
  }

  get rating() {
    return this.editForm.controls['rating'];
  }

  get stock() {
    return this.editForm.controls['stock'];
  }

  get description() {
    return this.editForm.controls['description'];
  }

  initializeEditForm() {
    this.editForm = this._fb.group({
      title: ['', Validators.required],
      id : ['', Validators.required],
      brand: ['', Validators.required],
      category: [this.categories, Validators.required],
      price: ['', Validators.required],
      discount: [''],
      rating: [''],
      stock: ['', Validators.required],
      description: [''],
    });
  }


  ngOnInit(): void {
    this.productId = this._activatedRoute.snapshot.queryParamMap.get('id');
    let title = this._activatedRoute.snapshot.queryParamMap.get('title');
    this.initializeEditForm();
    this.initializeCategories();
    this.getProduct();
    
  }

  initializeCategories() {
      this._db.list('/categories').valueChanges().subscribe((res : any) => {
        this.categories = res;
      })
  }

  getProduct() {
    this._productService.getItemFromListById(this.productId).subscribe(res=> {
      if (!res) return;
      this.editForm.patchValue(res);
    });
  }
   

  onEditProduct(value : any) {
    this._productService.updateProduct(this.productId, value).then(
      (res) => {
        alert("Product updated sucessfully!");
        this._router.navigate(["/products/manage"]);
        
      }
    );
    
    
  }


}

