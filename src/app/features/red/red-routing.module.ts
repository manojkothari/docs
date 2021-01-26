import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedMainMenuComponent } from './red-layout/red-main-menu/red-main-menu.component';
import { RedSideNavMenuComponent } from './red-layout/red-side-nav-menu/red-side-nav-menu.component';
import { MarketingAssetsComponent } from './components/marketing-assets/marketing-assets.component';

const routes: Routes = [
  { path: 'index', component: RedMainMenuComponent },
  {
    path: 'home', component: RedSideNavMenuComponent, children: [
      { path: 'asset-marketing', component: MarketingAssetsComponent },
      // { path: '**', component: Page404RgmComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedRoutingModule { }
