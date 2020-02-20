import { ProductService } from './../../services/product.service';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  productId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) { 

  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) this.productService.get(this.productId).pipe(take(1)).subscribe(p => this.product = p);

    console.log(this.product);
  }

  save(product) {
    if(this.productId) this.productService.update(this.productId, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.productId);
    this.router.navigate(['/admin/products']);
  }

}
