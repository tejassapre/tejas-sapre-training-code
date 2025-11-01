import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from "rxjs";

import { ProductDetailsResponse } from "../../models/product-details-response";
import { CartService } from '../../../carts/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProductsApi } from "../../services/products-api";

@Component({
  selector: 'bajaj-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  private _productsApi = inject(ProductsApi);
  private _route = inject(ActivatedRoute);
  private _cart = inject(CartService);
  private _toast = inject(ToastService);
  private _subscription = new Subscription();
  protected product: ProductDetailsResponse;
  protected loading = true;

  ngOnInit() {
    this._route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  protected addToCart(): void {
    const p = this.product?.data as any;
    if (!p) return;
    const originalPrice = p.price || 0;
    const discountPercent = p.discount || 0;
    const finalPrice = originalPrice - (originalPrice * discountPercent) / 100;
    this._cart.add({
      productId: p._id,
      name: p.name,
      originalPrice,
      discountPercent,
      finalPrice,
      quantity: 1,
      imageUrl: (p.images && p.images[0]) || undefined,
    });
    this._toast.show('Item added to cart', 'success');
  }

  private loadProduct(productId: string): void {
    this.loading = true;
    this._subscription = this._productsApi.getProductDetails(productId).subscribe({
      next: (response) => {
        if (response.success) {
          this.product = {
            ...response,
            data: {
              ...response.data,
              images: this.processImages(response.data.images)
            }
          };
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.loading = false;
      }
    });
  }

  private processImages(images: string[]): string[] {
    if (!images || images.length === 0) {
      // Return placeholder images from public/images
      return ['/images/img1.png.png', '/images/img2.png.png', '/images/img3.png.png'];
    }
    return images.map(img => {
      // If image is already a full URL or starts with /, return as is
      if (img.startsWith('http') || img.startsWith('/')) {
        return img;
      }
      // Otherwise, assume it's a filename and prepend the images path
      return `/images/${img}`;
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
