import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

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

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService) { }

  registrarUsuario() {
    const { name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password)
      .subscribe(ok => {

        if (ok === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', ok, 'error');
        }

      })

  }
}
