import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedRoutingModule } from './red-routing.module';
import { RedMainMenuComponent } from './red-layout/red-main-menu/red-main-menu.component';
import { RedSideNavMenuComponent } from './red-layout/red-side-nav-menu/red-side-nav-menu.component';
import { MarketingAssetsComponent } from './components/marketing-assets/marketing-assets.component';

import { Test2Component } from './components/test2/test2.component';

@NgModule({
  declarations: [
    RedMainMenuComponent,
    RedSideNavMenuComponent,
    MarketingAssetsComponent,
    Test2Component,
  ],
  imports: [
    CommonModule,
    RedRoutingModule
  ]
})
export class RedModule { }
