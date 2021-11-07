import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Role } from 'src/app/model/rol/role.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  private roles: Set<Role>;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(!this.tokenService.isLogged()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    const expectedRol = route.data.expectedRol;
    this.roles = this.tokenService.getRoles();
    let includeRol: boolean = false;
    
    this.roles.forEach(role => {
      if(this.tokenService.getToken() && expectedRol.includes(role)) {
        includeRol = true;
      }
    });

    if(!includeRol) this.router.navigate(['/']);
    return includeRol;
    
  }
}
