import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidator {
    static samePasswords(control: FormGroup) : ValidationErrors {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
  
        return password.value === confirmPassword.value ? null : { 'samePasswords': true };
    }
}
