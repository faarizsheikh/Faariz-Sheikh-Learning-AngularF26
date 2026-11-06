// EDIT GUARD SERVICE (edit-guard-service.ts):

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditGuardService {
  // Signal controlling whether editing is locked or not:
  readonly guardEnabled = signal(true);

  // Toggle the guard between enabled and disabled:
  toggleGuard(): void {
    this.guardEnabled.update((enabled) => !enabled);
  }
}
