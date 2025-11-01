import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationStart } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecurityApi } from '../../../features/security/services/security-api';

@Component({
  selector: 'bajaj-nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  private _platformId = inject(PLATFORM_ID);
  searchQuery = '';





  constructor(private router: Router, private security: SecurityApi) {}

  protected onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { 
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }

  protected clearSearch(): void {
    this.searchQuery = '';
    this.router.navigate(['/products']);
  }

  protected toggleSidebar(): void {
    if (isPlatformBrowser(this._platformId)) {
      // Dispatch custom event to toggle sidebar
      window.dispatchEvent(new CustomEvent('toggleSidebar'));
    }
  }

  protected get showOrders(): boolean {
    return !!localStorage.getItem('token') && !!localStorage.getItem('hasOrders');
  }

  protected get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  protected logout(): void {
    this.security.logout();
    this.router.navigate(['/home']);
  }


 protected get userRole(): string | null {
    return localStorage.getItem('role');
  }

  protected get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

            

}













