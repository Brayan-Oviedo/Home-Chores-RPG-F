import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Role } from './model/rol/role.model';
import { GuardService } from './service/auth/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/register'
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule),
    canActivate: [ GuardService ],
    data: { expectedRol: [Role.MASTER, Role.ADVENTURER] }
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)  // { preloadingStrategy: PreloadAllModules }  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
