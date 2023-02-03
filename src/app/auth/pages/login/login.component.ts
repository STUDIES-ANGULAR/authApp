import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email:    ['test1@test.com', [ Validators.required, Validators.email ]],
    password: ['1234567', [ Validators.required, Validators.minLength(6) ]]
  });
  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService
               ) { }

 
  login(){
    console.log(this.miFormulario.value);
    // this.router.navigateByUrl('/dashboard');
    const { email, password } = this.miFormulario.value;
    
    this.authService.login( email, password )
      .subscribe( ok => {
        // console.log(resp);
        if( ok ) {
          this.router.navigateByUrl('/dashboard');
        }else{
          //TODO: mostrar msj error
        }
      }

    );

  }

}
