// ROOT COMPONENT DEFINITION (app.ts):

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditGuardService } from './Shared/Services/edit-guard-service';
import { ErrorService } from './Shared/Services/error-service';
import { LoadingService } from './Shared/Services/loading-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  // Dependency Injection:
  protected editGuardService = inject(EditGuardService);
  protected loadingService = inject(LoadingService);
  protected errorService = inject(ErrorService);
}
