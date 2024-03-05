import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      userEmail: [null, [Validators.required]],
      userPassword: [null, [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log('login');
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

}
