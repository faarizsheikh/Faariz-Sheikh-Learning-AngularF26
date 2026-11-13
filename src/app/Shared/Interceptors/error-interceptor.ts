// ERROR INTERCEPTOR (error-interceptor.ts):

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../Services/error-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Dependency Injection:
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: unknown) => {
      // Check whether the error is an HTTP error:
      if (error instanceof HttpErrorResponse) {
        let message: string;

        // Set a friendly error message based on the status code:
        switch (true) {
          case error.status === 0:
            message =
              'Unable to connect to the server. Check your internet connection or browser permissions.';
            break;

          case error.status === 404:
            message = 'The requested resource could not be found.';
            break;

          case error.status >= 500:
            message = 'A server error occurred. Please try again later.';
            break;

          default:
            message = 'An unexpected error occurred while processing your request.';
            break;
        }

        // Display the global error message:
        errorService.setError(message);
      }

      // Pass the error back to the original subscriber:
      return throwError(() => error);
    }),
  );
};
