// EDIT ROUTE GUARD (edit.guard.ts):

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EditGuardService } from '../Services/edit-guard-service';

export const editGuard: CanActivateFn = () => {
  // Dependency Injection:
  const editGuardService = inject(EditGuardService);
  const router = inject(Router);

  // Check whether the guard is enabled:
  return editGuardService.guardEnabled() ? router.createUrlTree(['/characters']) : true;
};
