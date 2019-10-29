import { FormControl, FormGroup } from "@angular/forms";

export class CustomValidators {

  public static checkFirstCharacterValidator(control: FormControl): any {
    var valid = /^\d/.test(control.value);
    if (valid) {
      return { checkFirstCharacterValidator: true };
    }
    return null;
  }


  public static validateEmail(control: FormControl): any {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (control.value != "" && (!EMAIL_REGEXP.test(control.value))) {
      return { validateEmail: true };
    }

    return null;
  }

  public static validateEmailFromString(email: string): any {

    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email != "" && (!EMAIL_REGEXP.test(email))) {
      return true;
    }

    return false;
  }

  public static confirmPassword(control: FormGroup): any {
    let pwd1 = control.controls['password'];
    let pwd2 = control.controls['confirm_password'];
    let rv: any = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv.passwordMismatch = true;
    }
    return rv;
  }
}
