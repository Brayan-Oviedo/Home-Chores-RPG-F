import { Injectable } from '@angular/core';
import { Role } from 'src/app/model/rol/role.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private rols: Array<Role> = [];
  private TOKEN_KEY = "JwToken";

  constructor(
  ) { }

  setToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserName() {
    if(!this.isLogged()) return null;

    const values = this.getValuesPayloadFromToken();
    const userName = values.sub;
    return userName;
  }

  getRoles(): Set<Role> {
    if(!this.isLogged()) return null;

    const values = this.getValuesPayloadFromToken();
    const rols = values.roles;
    let roles: Set<Role> = new Set();

    if(rols.includes(Role.MASTER)) roles.add(Role.MASTER);
    if(rols.includes(Role.ADVENTURER)) roles.add(Role.ADVENTURER);

    return roles;
  }

  private getValuesPayloadFromToken() {
    const token: string = this.getToken();
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  logOut(): void {
    localStorage.clear();
  }

  isLogged(): boolean {
    return Boolean(this.getToken());
  }
}
