import { Component, inject, input, OnInit } from '@angular/core';
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

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-character-form',
  styleUrl: './character-form.scss',
  templateUrl: './character-form.html',
})
export class CharacterForm implements OnInit {
  // Injection:
  private fb = inject(FormBuilder);
  private characterService = inject(CharacterService);
  private router = inject(Router);

  // Route input:
  id = input<string | undefined>();

  // Variables:
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

  // Arrays:
  genders: string[][] = [
    ['', '[ -- Select Gender -- ]'],
    ['Male', 'Male'],
    ['Female', 'Female'],
    ['Unknown', 'Unknown'],
  ];

  charTypes: string[][] = [
    ['', '[ -- Select Character Type -- ]'],
    ['Protagonist', 'Protagonist'],
    ['Co-Protagonist', 'Co-Protagonist'],
    ['Antagonist', 'Antagonist'],
    ['Catalyst', 'Catalyst'],
    ['Supporting Character', 'Supporting Character'],
  ];

  stats: [boolean | null | undefined, string][] = [
    [null, '[ -- Select Status -- ]'],
    [true, 'Alive'],
    [undefined, 'Unknown'],
    [false, 'Dead'],
  ];

  // CHARACTER FORM:
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

    age: ['', [Validators.min(this.ageMinL), Validators.max(this.ageMaxL)]],

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

    imageLink: ['', [Validators.minLength(this.imgMinL), Validators.maxLength(this.imgMaxL)]],

    status: this.fb.control<boolean | null | undefined>(null, this.statusRequired),
  });

  // Load an existing character when editing:
  ngOnInit(): void {
    const id = this.id();

    if (id) {
      const character = this.characterService.getCharacter(Number(id));

      if (character) {
        this.characterForm.patchValue({
          firstName: character.firstName,
          nickName: character.nickName ?? '',
          lastName: character.lastName,
          quote: character.quote ?? '',
          age: character.age == null ? '' : String(character.age),
          gender: character.gender,
          played_by: character.played_by,
          character_type: character.character_type,
          description: character.description ?? '',
          imageLink: character.imageLink ?? '',
          status: character.status ?? null,
        });
      } else {
        this.router.navigate(['/characters']);
      }
    }
  }

  // Submit the form to add or update a character:
  protected onSubmit(): void {
    // Stop if form invalid:
    if (this.characterForm.invalid) return;

    // Get the values even from the disabled fields:
    const formValue = this.characterForm.getRawValue();

    // EDIT MODE:
    if (this.id()) {
      const id = Number(this.id());

      const existingCharacter = this.characterService.getCharacter(id);

      if (!existingCharacter) {
        this.router.navigate(['/characters']);
        return;
      }

      // Create an updated character:
      const updatedCharacter: Character = {
        id,
        firstName: formValue.firstName!,
        nickName: formValue.nickName!,
        lastName: formValue.lastName!,
        quote: formValue.quote!,
        age: formValue.age === '' ? undefined : Number(formValue.age),
        gender: formValue.gender!,
        played_by: formValue.played_by!,
        character_type: formValue.character_type!,
        description: formValue.description!,
        imageLink: formValue.imageLink!,
        status: formValue.status!,
      };

      // Update the existing character:
      this.characterService.updateCharacter(updatedCharacter);

      // Navigate back to the character details:
      this.router.navigate(['/characters', id, 'view']);

      console.log(
        `Character ${updatedCharacter.firstName} ${updatedCharacter.nickName} ${updatedCharacter.lastName} has been updated.`,
      );

      return;
    }

    // ADD MODE:

    // Generate the next available ID:
    const nextId =
      Math.max(0, ...this.characterService.charactersList().map((character) => character.id)) + 1;

    // Create a new character:
    const newCharacter: Character = {
      id: nextId,
      firstName: formValue.firstName!,
      nickName: formValue.nickName!,
      lastName: formValue.lastName!,
      quote: formValue.quote!,
      age: formValue.age === '' ? undefined : Number(formValue.age),
      gender: formValue.gender!,
      played_by: formValue.played_by!,
      character_type: formValue.character_type!,
      description: formValue.description!,
      imageLink: formValue.imageLink!,
      status: formValue.status!,
    };

    // Add the new character to the service:
    this.characterService.addCharacter(newCharacter);

    // Reset the form:
    this.characterForm.reset();

    // Navigate to the new character's details:
    this.router.navigate(['/characters', nextId, 'view']);

    console.log(
      `Character ${newCharacter.firstName} ${newCharacter.nickName} ${newCharacter.lastName} has been added.`,
    );
  }

  // Error Message:
  protected errMsg(controlName: string, fieldName: string, minL?: number, maxL?: number): string {
    const control = this.characterForm.get(controlName);

    return !control?.touched
      ? ''
      : control.hasError('required')
        ? `${fieldName} is required.`
        : control.hasError('minlength') || control.hasError('maxlength')
          ? `${fieldName} must be between ${minL} and ${maxL} characters.`
          : control.hasError('min') || control.hasError('max')
            ? `${fieldName} must be between ${minL} and ${maxL}.`
            : '';
  }

  // CUSTOM VALIDATORS:

  protected statusRequired(control: AbstractControl): ValidationErrors | null {
    return control.value === null ? { required: true } : null;
  }

  protected readonly isFormControl = isFormControl;
}
