import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage {
  ImagemSelecionada!: File;
  conteudo: string = '';
 
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    
    this.ImagemSelecionada = event.target.files[0];
  }
  profileImage( ) {
    const formData = new FormData();
    formData.append('imagem', this.ImagemSelecionada);
    formData.append('conteudo', this.conteudo);

    // Enviar os dados para o servidor usando HttpClient
    this.http.post('http://localhost/itConnect/src/service/upload.php', formData).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.log('Publicação criada com sucesso:', response.message);
          // Implemente a lógica para exibir uma mensagem de sucesso ou atualizar a lista de posts na página.
        } else if (response && response.error) {
          console.error('Erro ao criar publicação:', response.error);
          // Implemente a lógica para exibir uma mensagem de erro ao usuário.
        } else {
          console.error('Resposta do servidor inválida:', response);
          // Implemente a lógica para exibir uma mensagem de erro ao usuário.
        }
      },
      (error) => {
        console.error('Erro ao enviar formulário:', error);
        // Implemente a lógica para exibir uma mensagem de erro ao usuário.
      }
    );
  }


  iconStates: { [key: string]: boolean } = {}; // Objeto para rastrear o estado de curtida de cada ícone

  isIconClicked(iconKey: string) {
    // Verifica o estado de curtida do ícone com a chave fornecida
    return this.iconStates[iconKey] || false;
  }

  onIconClick(iconKey: string) {
    // Inverte o estado de curtida do ícone com a chave fornecida
    this.iconStates[iconKey] = !this.isIconClicked(iconKey);
  }
}