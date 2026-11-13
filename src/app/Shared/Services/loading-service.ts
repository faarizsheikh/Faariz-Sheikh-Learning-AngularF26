// LOADING SERVICE (loading-service.ts):

import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // Count the number of requests currently in progress:
  private requestCount = signal(0);

  // Read-only loading state:
  readonly isLoading = computed(() => this.requestCount() > 0);

  // Increase the request count:
  increase(): void {
    this.requestCount.update((count) => count + 1);
  }

  // Decrease the request count without going below zero:
  decrease(): void {
    this.requestCount.update((count) => Math.max(0, count - 1));
  }
}
