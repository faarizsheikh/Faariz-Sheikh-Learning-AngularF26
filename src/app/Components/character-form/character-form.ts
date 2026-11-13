// CHARACTER FORM COMPONENT CLASS (character-form.component.ts):

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
  // Dependency Injection:
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
    ['Unknown', 'Unknown'],
  ];

  stats: [boolean | null | undefined, string][] = [
    [null, '[ -- Select Status -- ]'],
    [true, 'Alive'],
    [undefined, 'Unknown'],
    [false, 'Dead'],
  ];

  // CHARACTER FORM:
  characterForm = this.fb.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(this.nameMinL),
          Validators.maxLength(this.nameMaxL),
          this.noWhitespace,
        ],
      ],

      nickName: [
        '',
        [
          Validators.minLength(this.nameMinL),
          Validators.maxLength(this.nameMaxL),
          this.noWhitespace,
        ],
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(this.nameMinL),
          Validators.maxLength(this.nameMaxL),
          this.noWhitespace,
        ],
      ],

      quote: [
        '',
        [
          Validators.minLength(this.quoteMinL),
          Validators.maxLength(this.quoteMaxL),
          this.noWhitespace,
        ],
      ],

      age: ['', [Validators.required, Validators.min(this.ageMinL), Validators.max(this.ageMaxL)]],
      ageUnknown: [this.fb.nonNullable.control(false)],

      gender: ['', Validators.required],

      played_by: [
        '',
        [
          Validators.required,
          Validators.minLength(this.actorMinL),
          Validators.maxLength(this.actorMaxL),
          this.noWhitespace,
        ],
      ],

      character_type: ['', Validators.required],

      description: [
        '',
        [
          Validators.minLength(this.descMinL),
          Validators.maxLength(this.descMaxL),
          this.noWhitespace,
        ],
      ],

      imageLink: [
        '',
        [Validators.minLength(this.imgMinL), Validators.maxLength(this.imgMaxL), this.noWhitespace],
      ],

      status: this.fb.control<boolean | null | undefined>(null, this.statusRequired),
    },
    {
      validators: [this.diffNames, this.uniqueChar.bind(this)],
    },
  );

  // Load an existing character when editing:
  ngOnInit(): void {
    const id = this.id();

    if (id) {
      const character = this.characterService.getCharacter(id);

      if (character) {
        console.log('Character being edited:', character);
        console.log('Character age:', character.age);
        this.characterForm.patchValue({
          firstName: character.firstName,
          nickName: character.nickName ?? '',
          lastName: character.lastName,
          quote: character.quote ?? '',
          age: character.age == undefined ? '' : String(character.age),
          gender: character.gender,
          played_by: character.played_by,
          character_type: character.character_type,
          description: character.description ?? '',
          imageLink: character.imageLink ?? '',
          status: character.status,
        });
        this.characterForm.controls.ageUnknown.setValue(character.age === undefined);
        this.updateAgeControls();
        this.characterForm.updateValueAndValidity();
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
      const id = this.id()!;

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
        age: formValue.ageUnknown
          ? undefined
          : formValue.age === '' || formValue.age == null
            ? undefined
            : Number(formValue.age),
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

    // Generate the next available ID:
    const newId = crypto.randomUUID();

    // Create a new character:
    const newCharacter: Character = {
      id: newId,
      firstName: formValue.firstName!,
      nickName: formValue.nickName!,
      lastName: formValue.lastName!,
      quote: formValue.quote!,
      age: formValue.ageUnknown
        ? undefined
        : formValue.age === '' || formValue.age == null
          ? undefined
          : Number(formValue.age),
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
    this.router.navigate(['/characters', newId, 'view']);

    console.log(
      `Character ${newCharacter.firstName} ${newCharacter.nickName} ${newCharacter.lastName} has been added.`,
    );
  }

  // Error Message:
  protected errMsg(controlName: string, fieldName: string, minL?: number, maxL?: number): string {
    const control = this.characterForm.get(controlName);

    // ! reverses boolean val:
    return !control?.touched
      ? ''
      : control.hasError('required')
        ? `${fieldName} is required.`
        : control.hasError('minlength') || control.hasError('maxlength')
          ? `${fieldName} must be between ${minL} and ${maxL} characters.`
          : control.hasError('min') || control.hasError('max')
            ? `${fieldName} must be between ${minL} and ${maxL}.`
            : control.hasError('whitespace')
              ? `${fieldName} cannot contain only whitespaces.`
              : '';
  }

  // CUSTOM VALIDATORS:
  protected statusRequired(control: AbstractControl): ValidationErrors | null {
    return control.value === null ? { required: true } : null;
  }

  // Check for Only Whitespaces:
  protected noWhitespace(control: AbstractControl): ValidationErrors | null {
    return typeof control.value === 'string' &&
      control.value.length > 0 &&
      control.value.trim().length === 0
      ? { whitespace: true }
      : null;
  }

  protected uniqueChar(control: AbstractControl): ValidationErrors | null {
    const firstName = control.get('firstName')?.value;
    const lastName = control.get('lastName')?.value;

    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      return null;
    }

    const fix = (name: string) => name.trim().replace(/\s+/g, ' ').toLowerCase();

    const currentId = this.id();

    const duplicate = this.characterService.charactersList().some((character) => {
      const sameName =
        fix(character.firstName) === fix(firstName) && fix(character.lastName) === fix(lastName);

      return sameName && character.id !== currentId;
    });

    return duplicate ? { duplicateChar: true } : null;
  }

  // Check for firstName and lastName being identical:
  protected diffNames(control: AbstractControl): ValidationErrors | null {
    const firstName = control.get('firstName')?.value;
    const lastName = control.get('lastName')?.value;

    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      return null;
    }

    return firstName.trim().toLowerCase() === lastName.trim().toLowerCase()
      ? { duplicateName: true }
      : null;
  }

  private updateAgeControls(): void {
    const age = this.characterForm.controls.age;
    const ageUnknown = this.characterForm.controls.ageUnknown;

    if (ageUnknown.value) {
      age.disable();
      ageUnknown.enable();
    } else if (age.value !== '' && age.value !== null) {
      age.enable();
      ageUnknown.disable();
    } else {
      age.enable();
      ageUnknown.enable();
    }
  }

  // Handle changes to the age input:
  protected onAgeInput(): void {
    const age = this.characterForm.controls.age;
    const ageUnknown = this.characterForm.controls.ageUnknown;

    if (age.value !== '' && age.value !== null) {
      ageUnknown.disable();
    } else {
      ageUnknown.enable();
    }
  }

  // Handle the Age Unknown checkbox:
  protected onAgeUnknownChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    const age = this.characterForm.controls.age;
    const ageUnknown = this.characterForm.controls.ageUnknown;

    ageUnknown.setValue(checked);

    if (checked) {
      age.setValue('');
      age.disable();
    } else {
      age.enable();
    }
  }

  protected readonly isFormControl = isFormControl;
}
