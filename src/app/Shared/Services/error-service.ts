// ERROR SERVICE (error-service.ts):

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  // Store the current global error message:
  readonly errorMessage = signal<string | null>(null);

  // Set an error message:
  setError(message: string): void {
    this.errorMessage.set(message);
  }

  // Clear the current error message:
  clearError(): void {
    this.errorMessage.set(null);
  }
}
