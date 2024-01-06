import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APIService } from 'src/providers/apiservice';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  formLogin: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private router: Router ,) {
    this.formLogin = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      pass: ['',Validators.required]
    });
   }

   submitLogin() {
    if(this.formLogin.valid) {
      console.log('Login válido: ', this.formLogin.value);
      

      this.http.post('http://localhost/FitConnect/src/service/login.php', this.formLogin.value).subscribe(
        (response:any) => {

          if (response && response.message) {
            console.log('Resposta do servidor: ',response.message);

            APIService.usuarioLogado = response.message[0]
            this.router.navigate(['home']);

          }else if (response && response.error){
            console.error('Erro ao enviar formulario:',response.error);
            alert(response.error);

          }else{
            console.error('Resposta do servidor invalido:' , response);
            alert(response);
          }
        },
        
        (error) => {
          console.error('Error ao enviar formulario:', error);

          alert(error);
        }
      );

    } else {
      Object.keys(this.formLogin.controls).forEach((field) => {
        const control = this.formLogin.get(field);
        if(control) {
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
  cadastrar(){
    this.router.navigate(['register'])
  }
}
