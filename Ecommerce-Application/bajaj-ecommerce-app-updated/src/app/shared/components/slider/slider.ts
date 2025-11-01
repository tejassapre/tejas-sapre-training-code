import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsApi } from '../../../features/products/services/products-api';
import { ProductDetailsSection } from '../product-details-section/product-details-section';

interface SliderProduct {
  _id: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  rating: number;
  numReviews: number;
}

@Component({
  selector: 'bajaj-slider',
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider implements OnInit, OnDestroy {
  private _productsApi = inject(ProductsApi);
  protected sliderProducts: SliderProduct[] = [];
  protected currentIndex = 0;
  protected autoSlideInterval: any;
  protected selectedProductId = '';
  protected isDetailsVisible = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._productsApi.getproducts().subscribe({
      next: (response) => {
        if (response.success && response.data.length > 0) {
          // Get first 8 products for slider
          this.sliderProducts = response.data.slice(0, 8).map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            discount: p.discount,
            images: this.processImages(p.images),
            rating: p.rating,
            numReviews: p.numReviews
          }));
          this.startAutoSlide();
        }
      },
      error: (err) => {
        console.error('Error loading products for slider:', err);
      }
    });
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

  protected getCurrentPrice(product: SliderProduct): number {
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

  protected goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  protected nextSlide(): void {
    if (this.sliderProducts.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.sliderProducts.length;
      this.resetAutoSlide();
    }
  }

  protected prevSlide(): void {
    if (this.sliderProducts.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.sliderProducts.length) % this.sliderProducts.length;
      this.resetAutoSlide();
    }
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Auto-slide every 5 seconds
  }

  private resetAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
}
