import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupFormGroup: FormGroup= this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  });

  constructor(
    public formBuilder: FormBuilder) {
  }

  signupUser() {
  }

}
