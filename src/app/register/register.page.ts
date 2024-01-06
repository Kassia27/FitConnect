import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {

  registerForm: FormGroup;

  //validação dos campos
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router:Router) { 
    this.registerForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birth: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required]
    });
  }

  submitRegister(){
    if(this.registerForm.valid && this.registerForm.value.confirmPass == this.registerForm.value.pass) {
      console.log('Cadastrado com sucesso!:', this.registerForm.value);
     this.http.post('http://localhost/FitConnect/src/service/process_formulario.php', this.registerForm.value)
  .subscribe(
    (response: any) => {
      if (response && response.message){
        console.log('Resposta do servidor:', response.message);
        alert(response.message);
        this.router.navigate(['login']);
       }else if (response && response.error){
        console.error('Erro ao enviar formulário:', response.error);
        alert(response.error);
       }
       else{
        console.error('Resposta do servidor inválida:', response);
        alert(response);
       }
    },
    (error) => {
      console.error('Erro ao enviar formulário:', error);
      alert(error);
    }
  );

  this.registerForm.reset();  
  }else if(this.registerForm.value.confirmPass !== this.registerForm.value.pass){
    alert('As senhas não são iguais');
  }
  else{
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);

      if(control){
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
}