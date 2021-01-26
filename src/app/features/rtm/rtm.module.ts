import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtmMainMenuComponent } from './rtm-layout/rtm-main-menu/rtm-main-menu.component';
import { RtmSideNavMenuComponent } from './rtm-layout/rtm-side-nav-menu/rtm-side-nav-menu.component';
import { RtmRoutingModule } from './rtm-routing.module';

@NgModule({
  declarations: [
    RtmMainMenuComponent,
    RtmSideNavMenuComponent
  ],
  imports: [
    CommonModule,
    RtmRoutingModule
  ]
})
export class RtmModule { }
