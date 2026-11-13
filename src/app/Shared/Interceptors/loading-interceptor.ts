// LOADING INTERCEPTOR (loading-interceptor.ts):

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../Services/loading-service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Dependency Injection:
  const loadingService = inject(LoadingService);

  // Increase the request count:
  loadingService.increase();

  // Continue the request and decrease the count when it finishes:
  return next(req).pipe(finalize(() => loadingService.decrease()));
};
