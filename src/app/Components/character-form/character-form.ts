/* -- CHARACTER FORM COMPONENT CLASS (character-form.ts): -- */

import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  isFormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CharacterService } from '../../Shared/Services/character-service';
import { Router } from '@angular/router';
import { Character } from '../../Shared/Models/character-data';
import { maxLength } from '@angular/forms/signals';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-character-form',
  styleUrl: './character-form.scss',
  templateUrl: './character-form.html',
})
export class CharacterForm {
  private fb = inject(FormBuilder);
  private characterService = inject(CharacterService);
  private router = inject(Router);
  nameMinL = 2;
  nameMaxL = 15;
  quoteMinL = 15;
  quoteMaxL = 300;
  ageMinL = 2;
  ageMaxL = 120;
  ageStep = 1;
  actorMinL = 0;
  actorMaxL = 50;
  descMinL = 15;
  descMaxL = 300;
  imgMinL = 10;
  imgMaxL = 500;

  characterForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(this.nameMinL),
        Validators.maxLength(this.nameMaxL),
      ],
    ],

    nickName: ['', [Validators.minLength(this.nameMinL), Validators.maxLength(this.nameMaxL)]],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(this.nameMinL),
        Validators.maxLength(this.nameMaxL),
      ],
    ],

    quote: ['', [Validators.minLength(this.quoteMinL), Validators.maxLength(this.quoteMaxL)]],
    age: ['', [Validators.minLength(this.ageMinL), Validators.maxLength(this.ageMaxL)]],
    gender: ['', Validators.required],
    played_by: [
      '',
      [
        Validators.required,
        Validators.minLength(this.actorMinL),
        Validators.maxLength(this.actorMaxL),
      ],
    ],
    character_type: ['', Validators.required],
    description: ['', [Validators.minLength(this.descMinL), Validators.maxLength(this.descMaxL)]],
    imageLink: [null, [Validators.minLength(this.imgMinL), Validators.maxLength(this.imgMaxL)]],
    status: [null, this.statusRequired],
  });

  // Submit the form to add a new character:
  protected onSubmit(): void {
    // Stop if form invalid:
    if (this.characterForm.invalid) return;

    // Get the values even from the disabled fields:
    const formValue = this.characterForm.getRawValue();

    // Generate the next available id:
    const nextId =
      Math.max(0, ...this.characterService.charactersList().map((character) => character.id)) + 1;

    // Create a new character:
    const newCharacter: Character = {
      id: nextId,
      firstName: formValue.firstName!,
      nickName: formValue.nickName!,
      lastName: formValue.lastName!,
      quote: formValue.quote!,
      age: formValue.age!,
      gender: formValue.gender!,
      played_by: formValue.played_by!,
      character_type: formValue.character_type!,
      description: formValue.description!,
      imageLink: formValue.imageLink!,
      status: formValue.status!,
    };

    // Add the new character to the service:
    this.characterService.addCharacter(newCharacter);

    // Reset the form & navigate to the details:
    this.onReset();
    this.router.navigate(['/characters/' + nextId]);

    // Console the change -- Might change this to effect() or something later:
    console.log(
      `Character ${newCharacter.firstName} ${newCharacter.nickName} ${newCharacter.lastName} has been added.`,
    );
  }

  // Reset the form:
  protected onReset(): void {
    this.characterForm.reset({
      firstName: '',
      nickName: '',
      lastName: '',
      quote: '',
      age: '',
      gender: '',
      played_by: '',
      character_type: '',
      description: '',
      imageLink: null,
      status: null,
    });
  }

  // CUSTOM VALIDATORS:

  // Reject null (default value for status) as input.

  statusRequired(control: AbstractControl): ValidationErrors | null {
    // Source used: https://angular.dev/api/forms/AbstractControl
    return control.value === null ? { required: true } : null;
  }

  protected readonly isFormControl = isFormControl;
  protected readonly maxLength = maxLength;
}
