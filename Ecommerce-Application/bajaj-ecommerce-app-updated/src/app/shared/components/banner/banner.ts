import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApi } from '../../../features/products/services/products-api';
import { ProductData } from '../../../features/products/models/product-data';
import { ProductDetailsSection } from '../product-details-section/product-details-section';

@Component({
  selector: 'bajaj-banner',
  imports: [CommonModule, ProductDetailsSection],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner implements OnInit {
  private _productsApi = inject(ProductsApi);
  protected products: ProductData[] = [];
  protected loading = true;
  protected selectedProductId = '';
  protected isDetailsVisible = false;
  protected currentPage = 1;
  protected itemsPerPage = 6;
  protected totalPages = 0;
  protected paginated: ProductData[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._productsApi.getproducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data.map(p => ({
            ...p,
            images: this.processImages(p.images)
          }));
          this.computePagination();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }

  private computePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage) || 1;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginated = this.products.slice(start, start + this.itemsPerPage);
  }

  protected goTo(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.computePagination();
  }

  private processImages(images: string[]): string[] {
    if (!images || images.length === 0) {
      // Return random placeholder images from public/images (img1.png to img23.png)
      const randomImages = this.getRandomImages(3);
      return randomImages;
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

  private getRandomImages(count: number): string[] {
    const availableImages = [
      'img1.png.png', 'img2.png.png', 'img3.png.png', 'img4.png.png', 'img5.png.png',
      'img6.png.png', 'img7.png.png', 'img8.png.png', 'img9.png.png', 'img10.png.png',
      'img11.png.png', 'img12.png.png', 'img13.png.png', 'img14.png.png', 'img15.png.png',
      'img16.png.png', 'img17.png.png', 'img18.png.png', 'img19.png.png', 'img20.png.png',
      'img21.png.png', 'img22.png.png', 'img23.png.png'
    ];
    
    const images = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      images.push(`/images/${availableImages[randomIndex]}`);
    }
    return images;
  }

  protected getCurrentPrice(product: ProductData): number {
    return product.price - (product.price * product.discount / 100);
  }

  protected onProductSelection(id: string): void {
    this.selectedProductId = id;
    this.isDetailsVisible = true;
    // Scroll to details section
    setTimeout(() => {
      const element = document.getElementById('product-details');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  protected closeDetails(): void {
    this.isDetailsVisible = false;
    this.selectedProductId = '';
  }
}
