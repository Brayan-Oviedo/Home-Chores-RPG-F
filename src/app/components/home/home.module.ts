import { NgModule } from '@angular/core';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/module/shared.module';
import { GuildPage } from './guild/guild.page';

@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    GuildPage
  ]
})
export class HomePageModule {}
