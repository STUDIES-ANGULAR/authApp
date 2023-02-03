import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  miFormulario: FormGroup = this.fb.group({
    name:     ['Test 5', [ Validators.minLength(3), Validators.required ]],
    email:    ['test5@gmail.com', [ Validators.email, Validators.required ]],
    password: ['1234567', [ Validators.minLength(6), Validators.required]]
  });

  constructor( private fb: FormBuilder) { }

  registrarUsuario(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}
