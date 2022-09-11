import {FormGroup, ValidationErrors} from "@angular/forms";

export function passwordValidator(group: FormGroup): ValidationErrors | null {
  //console.log('group pass value:', group.get('password')?.value);
  //console.log('group conf pass value:', group.get('confirmPassword')?.value);
  const passwordValue = group.get('password')?.value
  const confirmPasswordValue = group.get('confirmPassword')?.value
  if (group.get('password')?.valid && group.get('confirmPassword')?.valid) {
    if (passwordValue === confirmPasswordValue) {
      return null
  }
    return {error: "passwords don't match"}
  }
  return null
}
