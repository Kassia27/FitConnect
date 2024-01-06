import { Injectable } from '@angular/core';
import { APIService } from 'src/providers/apiservice';
import { Router,CanActivate,ActivatedRouteSnapshot} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor( private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
      if(APIService.usuarioLogado){
        return true;

      }else{
        this.router.navigate(["login"]);
        return false;
      }
      
    }
}
