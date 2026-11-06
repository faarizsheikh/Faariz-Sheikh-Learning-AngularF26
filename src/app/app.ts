// ROOT COMPONENT DEFINITION (app.ts):

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditGuardService } from './Shared/Services/edit-guard-service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  // Dependency Injection:
  protected editGuardService = inject(EditGuardService);
}
