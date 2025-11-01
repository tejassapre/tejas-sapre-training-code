import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  }
  const returnUrl = state.url && state.url !== '/' ? state.url : '/home';
  router.navigate(['/login'], { queryParams: { returnurl: returnUrl } });
  return false;
};


