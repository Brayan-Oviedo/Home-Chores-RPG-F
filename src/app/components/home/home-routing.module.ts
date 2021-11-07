import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from 'src/app/model/rol/role.model';
import { GuardService } from 'src/app/service/auth/guard/guard.service';
import { GuildPage } from './guild/guild.page';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'guild',
        component: GuildPage,
        canActivate: [GuardService],
        data: { expectedRol: [Role.ADVENTURER, Role.MASTER] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
